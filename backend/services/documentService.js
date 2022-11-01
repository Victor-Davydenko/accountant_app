import Contract from '../models/contractModel.js';
import CompletedWorkAct from '../models/completedWorkActModel.js';

class DocumentService {
  async addContract(contract, UserId) {
    const newContract = await Contract.create({ ...contract, UserId });
    return newContract;
  }

  async updateContract(updatedContract, id) {
    const contractData = await Contract.update({ ...updatedContract }, { where: { id } });
    return contractData;
  }

  async removeContract(id) {
    const contractData = await Contract.findOne({ where: { id } });
    const removed = await contractData.destroy();
    return removed;
  }

  async getContract(id) {
    const contract = await Contract.findByPk(id);
    return contract;
  }

  async addCompletedWorkAct(contract, UserId) {
    const newCompletedWorkAct = await CompletedWorkAct.create({ ...contract, UserId });
    return newCompletedWorkAct;
  }

  async updateCompletedWorkAct(updatedCompletedWorkAct, id) {
    const completedWorkActData = await CompletedWorkAct.update({ ...updatedCompletedWorkAct }, { where: { id } });
    return completedWorkActData;
  }

  async removeCompletedWorkAct(id) {
    const completedWorkActData = await CompletedWorkAct.findOne({ where: { id } });
    const removed = await completedWorkActData.destroy();
    return removed;
  }

  async getCompletedWorkAct(id) {
    const completedWorkAct = await CompletedWorkAct.findByPk(id);
    return completedWorkAct;
  }

  async getAllDocuments() {
    const promises = [await Contract.findAll(), await CompletedWorkAct.findAll()];
    const result = await Promise.all(promises);
    const allDocuments = {
      contracts: result[0],
      completedWorkAct: result[1],
    };
    return allDocuments;
  }
}

export default new DocumentService();
