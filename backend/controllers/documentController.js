import jwt from 'jsonwebtoken';
import documentService from '../services/documentService.js';

class DocumentController {
  async addContract(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = jwt.decode(refreshToken);
      const { id: UserId } = userData;
      const contract = req.body;
      const contractData = await documentService.addContract(contract, UserId);
      return res.json(contractData);
    } catch (e) {
      console.log(e);
    }
  }

  async removeContract(req, res) {
    try {
      const { id } = req.params;
      const contractData = await documentService.removeContract(id);
      return res.json(contractData);
    } catch (e) {
      console.log(e);
    }
  }

  async updateContract(req, res) {
    try {
      const updatedContract = req.body;
      const { id } = req.params;
      console.log(id);
      const contractData = await documentService.updateContract(updatedContract, id);
      return res.json(contractData);
    } catch (e) {
      console.log(e);
    }
  }

  async getContract(req, res) {
    try {
      const { id } = req.params;
      const contract = await documentService.getContract(id);
      return res.json(contract);
    } catch (e) {
      console.log(e);
    }
  }

  async addCompletedWorkAct(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = jwt.decode(refreshToken);
      const { id: UserId } = userData;
      const completedWorkAct = req.body;
      const completedWorkActData = await documentService.addCompletedWorkAct(completedWorkAct, UserId);
      return res.json(completedWorkActData);
    } catch (e) {
      console.log(e);
    }
  }

  async removeCompletedWorkAct(req, res) {
    try {
      const { id } = req.params;
      const contractData = await documentService.removeCompletedWorkAct(id);
      return res.json(contractData);
    } catch (e) {
      console.log(e);
    }
  }

  async updateCompletedWorkAct(req, res) {
    try {
      const updatedCompletedWorkAct = req.body;
      const { id } = req.params;
      const completedWorkActData = await documentService.updateCompletedWorkAct(updatedCompletedWorkAct, id);
      return res.json(completedWorkActData);
    } catch (e) {
      console.log(e);
    }
  }

  async getCompletedWorkAct(req, res) {
    try {
      const { id } = req.params;
      const completedWorkAct = await documentService.getCompletedWorkAct(id);
      return res.json(completedWorkAct);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllDocuments(req, res) {
    try {
      const allDocuments = await documentService.getAllDocuments();
      return res.json(allDocuments);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new DocumentController();
