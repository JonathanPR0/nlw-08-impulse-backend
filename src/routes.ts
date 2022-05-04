import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailerMailAdapter';
import { SubmitFeedbackFunction } from './functions/submitFeedbackFunction';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository'

export const routes = express.Router();

routes.post("/feedbacks", async(req, res) => {
  const {type,comment,screenshot} = req.body;
  
  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackFunction = new SubmitFeedbackFunction(
    prismaFeedbackRepository, 
    nodemailerMailAdapter
  )

  await submitFeedbackFunction.execute({type, comment, screenshot})

  return res.status(201).send()
})