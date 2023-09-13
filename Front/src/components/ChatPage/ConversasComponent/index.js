import React, { useEffect } from "react";
import {
  ContactInfo,
  Layout,
  SearchComponent,
  UserData,
  WarningDiv,
  ProfileDiv,
  ArchiveDiv,
  ArchiveIcon,
} from "./style";
import { Search } from "react-feather";
import PropTypes from "prop-types";
import { listenerMessages } from "../../../services/socket-listener";
import logo from "../../../assets/LOGO BONECO 1.png";
import iconHeader from "../../../assets/icon-header.svg";
import ContactsModal from "../../Modal/ModalContacts/index";
import useContacts from "../../Modal/ModalContacts/useContacts";

const DEFAULT_IMAGE_URL = "/user.png";

const ConversasComponent = ({ chats, setChats, onSearch, onClickContact}) => {
  useEffect(() => {
    listenerMessages((err, data) => {
      if (err) return;

      const newList = [];
      const filteredList = chats.filter(
        (filtro) => filtro.id !== data.response.chatId
      );

      newList.unshift([...filteredList, data.response]);
      setChats(newList);
    });
  }, [chats]);

  useEffect(() => {
    setVisibleChats(chats.filter((chat) => !chat.archive));
  }, [chats]);

  // Adicionar novo estado
  const [showArchived, setShowArchived] = React.useState(false);

  // Atualizar a função toggleArchive
  const toggleArchive = () => {
    setShowArchived(!showArchived);
  };

  // Atualizar useEffect para reagir às mudanças em showArchived e chats
  useEffect(() => {
    if (showArchived) {
      setVisibleChats(chats.filter((chat) => chat.archive));
    } else {
      setVisibleChats(chats.filter((chat) => !chat.archive));
    }
  }, [chats, showArchived]);

  // 1. Estado para controlar os chats visíveis
  const [visibleChats, setVisibleChats] = React.useState(
    chats.filter((chat) => !chat.archive)
  );

  const onChangeContact = () => {
    const elContactsMain = document.querySelector("#all-contacts");
    const contacts = elContactsMain.querySelectorAll(".contact-li");

    for (const user of contacts) {
      user.addEventListener("click", function () {
        const current = document.getElementsByClassName("active");

        if (current.length > 0) {
          current[0].classList.remove("active");
        }

        this.classList.add("active");
      });
    }
  };

  const [imageError, setImageError] = React.useState({});

  const [isModalOpen, setModalOpen] = React.useState(false);

  const contacts = useContacts();

  return (
    <Layout>
      <ProfileDiv>
        <img src={logo} alt="Foto de perfil" />

        <div
          id="icon"
          onClick={() => setModalOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <img src={iconHeader} alt="Foto de perfil" />
        </div>
      </ProfileDiv>

      <WarningDiv>
        <p>
          Sua assinatura vence em <span className="bold">7 dias</span>, contate
          seu <span className="bold">franqueado</span>
        </p>
      </WarningDiv>

      <SearchComponent style={{ marginBottom: 0 }}>
        <Search />
        <input
          placeholder={"Pesquisar ou começar uma nova conversa"}
          onChange={(e) => onSearch(e)}
        />
      </SearchComponent>

      <ArchiveDiv onClick={toggleArchive}>
        <ArchiveIcon />
        <p>Conversas Arquivadas</p>
      </ArchiveDiv>

      <ul id={"all-contacts"} onClick={() => onChangeContact()}>
        {visibleChats.length > 0
          ? visibleChats.map((contact, index) => {
              return (
                <li
                  className={"contact-li"}
                  key={index}
                  onClick={() => onClickContact(contact)}
                >
                  <ContactInfo>
                    <input type={"radio"} name={"contact"} />

                    <UserData>
                      <img
                        src={
                          imageError[contact.id]
                            ? DEFAULT_IMAGE_URL
                            : contact.imgUrl || DEFAULT_IMAGE_URL
                        }
                        alt={`${contact.name}`}
                        loading={"lazy"}
                        onError={(e) => {
                          if (!imageError[contact.id]) {
                            setImageError((prev) => ({
                              ...prev,
                              [contact.id]: true,
                            }));
                            e.target.src = DEFAULT_IMAGE_URL;
                          }
                        }}
                      />

                      <div className={"principal-info"}>
                        <p className={"contact-name"}>
                          {contact.name === undefined
                            ? contact?.id
                                ?.replace("@c.us", "")
                                .replace("@g.us", "")
                            : contact.name}
                        </p>

                        <div className={"contact-message"}>
                          {!contact.msgs
                            ? "Não foi possível carregar as mensagens anteriores..."
                            : contact.msgs.length > 0
                            ? contact.msgs[contact.msgs.length - 1].type ===
                                "image" ||
                              contact.msgs[contact.msgs.length - 1].type ===
                                "video" ||
                              contact.msgs[contact.msgs.length - 1].type ===
                                "file" ||
                              contact.msgs[contact.msgs.length - 1].type ===
                                "ptt" ||
                              contact.msgs[contact.msgs.length - 1].type ===
                                "sticker"
                              ? "Mensagem de mídia"
                              : contact.msgs[contact.msgs.length - 1].type ===
                                "revoked"
                              ? "Mensagem Excluída"
                              : contact.msgs[contact.msgs.length - 1].type ===
                                "gp2"
                              ? "Não há mensagens"
                              : contact.msgs[contact.msgs.length - 1].type ===
                                "notification_template"
                              ? "Não há mensagens"
                              : contact.msgs[contact.msgs.length - 1].body
                            : "Não foi possível carregar as mensagens anteriores..."}

                          {contact.unreadCount !== 0 && (
                            <div className={"unread-message"} />
                          )}
                        </div>
                      </div>
                    </UserData>
                  </ContactInfo>
                </li>
              );
            })
          : null}
      </ul>

      {isModalOpen && (
        <ContactsModal
          contacts={contacts}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Layout>
  );
};

ConversasComponent.propTypes = {
  chats: PropTypes.any.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClickContact: PropTypes.func.isRequired,
};

export default ConversasComponent;
