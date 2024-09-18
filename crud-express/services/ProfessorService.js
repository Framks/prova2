const ProfessorModel = require("../models/ProfessorModel")
//const professores = require("../data/data")

const admin = require("./firebaseService")

class ProfessorService{


    static async listar() {
        try {
          // Acessa a coleção 'professores' do Firestore
          const referenc = admin.firestore().collection('professores');
          const snapshot = await referenc.get();
    
          const users = snapshot.docs.map(doc => ({
            id:doc.id, ...doc.data()
        })
        )
          return users
        } catch (error) {
          console.error('Erro ao listar professores:', error);
          throw error;
        }
      }
// ordem id, nome, curso, titulacao, universidade, ai)
    static async criar(data){
        const db = admin.firestore();
        let novoProfessor = {
            nome: data.nome,
            curso: data.curso,
            titulacao: data.titulacao,
            universidade: data.universidade,
            ai: data.ai
        }
        const docRef = await db.collection('professores').add(novoProfessor);
        return {id:docRef.id, ...novoProfessor};
    }

    static async getById(id){
        const db = admin.firestore();
        const docRef = db.collection('professores').doc(id);
        const doc = await docRef.get()
        if(!doc.exists){
            throw new Error("Professor não encontrado");
        }
        return {id:doc.id, ...doc.data()}
    }

    static async editar(id, data) {
        const db = admin.firestore();
        const docRef = db.collection('professores').doc(id);
    
        // Atualiza o documento com os novos dados
        await docRef.update({
            nome: data.nome,
            curso: data.curso,
            titulacao: data.titulacao,
            universidade: data.universidade,
            ai: data.ai
        });
    
        // Retorna o documento atualizado
        const updatedDoc = await docRef.get();
        return { id: updatedDoc.id, ...updatedDoc.data() };
    }

    static async delete(id) {
        const db = admin.firestore();
        const docRef = db.collection('professores').doc(id);
    
        // Deleta o documento
        await docRef.delete();
        return { message: 'Professor deletado com sucesso' };
    }
}

module.exports = ProfessorService