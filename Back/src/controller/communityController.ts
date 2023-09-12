import { Request, Response } from 'express';

export async function createCommunity(req: Request, res: Response) {
  const { name, description, groupIds } = req.body;

  try {
    const response = await req.client.createCommunity(
      name,
      description,
      groupIds
    );

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on create community',
      error: error,
    });
  }
}

export async function deactivateCommunity(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const response = await req.client.deactivateCommunity(id);

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on deactivate community',
      error: error,
    });
  }
}

export async function addSubgroupsCommunity(req: Request, res: Response) {
  const { id, groupsIds } = req.body;

  try {
    const response = await req.client.addSubgroupsCommunity(id, groupsIds);

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on add subgroup',
      error: error,
    });
  }
}

export async function removeSubgroupsCommunity(req: Request, res: Response) {
  const { id, groupsIds } = req.body;

  try {
    const response = await req.client.removeSubgroupsCommunity(id, groupsIds);

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on remove subgroup',
      error: error,
    });
  }
}

export async function demoteCommunityParticipant(req: Request, res: Response) {
  const { id, participantsId } = req.body;

  try {
    const response = await req.client.demoteCommunityParticipant(
      id,
      participantsId
    );

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on demote participant of communoty',
      error: error,
    });
  }
}

export async function promoteCommunityParticipant(req: Request, res: Response) {
  const { id, participantsId } = req.body;

  try {
    const response = await req.client.promoteCommunityParticipant(
      id,
      participantsId
    );

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on demote participant of communoty',
      error: error,
    });
  }
}

export async function getCommunityParticipants(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const response = await req.client.getCommunityParticipants(id);

    return res.status(200).json(response);
  } catch (error) {
    req.logger.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error on get participant of communoty',
      error: error,
    });
  }
}