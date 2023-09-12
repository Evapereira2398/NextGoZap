import { Request, Response } from 'express';

export async function addNewLabel(req: Request, res: Response) {
  const { name, options } = req.body;
  if (!name)
    return res.status(401).send({
      message: 'Name was not informed',
    });

  try {
    const result = await req.client.addNewLabel(name, options);
    res.status(201).json({ status: 'success', response: result });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao adicionar etiqueta.',
      error: error,
    });
  }
}

export async function addOrRemoveLabels(req: Request, res: Response) {
  const { chatIds, options } = req.body;
  if (!chatIds || !options)
    return res.status(401).send({
      message: 'chatIds or options was not informed',
    });

  try {
    const result = await req.client.addOrRemoveLabels(chatIds, options);
    res.status(201).json({ status: 'success', response: result });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao adicionar/deletar etiqueta.',
      error: error,
    });
  }
}

export async function getAllLabels(req: Request, res: Response) {
  try {
    const result = await req.client.getAllLabels();
    res.status(201).json({ status: 'success', response: result });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao buscar etiquetas.',
      error: error,
    });
  }
}

export async function deleteAllLabels(req: Request, res: Response) {
  try {
    const result = await req.client.deleteAllLabels();
    res.status(201).json({ status: 'success', response: result });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao deletar todas as etiquetas.',
      error: error,
    });
  }
}

export async function deleteLabel(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await req.client.deleteLabel(id);
    res.status(201).json({ status: 'success', response: result });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: 'Erro ao deletar etiqueta.',
      error: error,
    });
  }
}
