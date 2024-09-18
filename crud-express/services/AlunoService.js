const ProfessorModel = require("../models/ProfessorModel")

const admin = require("./firebaseService")

class AlunoService{


    static async listar() {
        try {
          const referenc = admin.firestore().collection('alunos');
          const snapshot = await referenc.get();
    
          const users = snapshot.docs.map(doc => ({
            id:doc.id, ...doc.data()
        })
        )
          return users
        } catch (error) {
          console.error('Erro ao listar alunos:', error);
          throw error;
        }
      }
    static async criar(data){
        const db = admin.firestore();
        let novoAluno = {
            nome: data.nome,
            curso: data.curso,
            ira: data.ira
        }
        const docRef = await db.collection('alunos').add(novoAluno);
        return {id:docRef.id, ...novoAluno};
    }

    static async getById(id){
        const db = admin.firestore();
        const docRef = db.collection('alunos').doc(id);
        const doc = await docRef.get()
        if(!doc.exists){
            throw new Error("Aluno não encontrado");
        }
        return {id:doc.id, ...doc.data()}
    }

    static async editar(id, data) {
        const db = admin.firestore();
        const docRef = db.collection('alunos').doc(id);
        await docRef.update({
            nome: data.nome,
            curso: data.curso,
            ira: data.ira
        });
        const updatedDoc = await docRef.get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }

    static async delete(id) {
        const db = admin.firestore();
        const docRef = db.collection('alunos').doc(id);
        await docRef.delete();
        return { message: 'Aluno deletado com sucesso' };
    }
}

module.exports = AlunoService