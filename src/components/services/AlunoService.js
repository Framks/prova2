import axios from "axios";

const url = "http://localhost:3002/alunos"

class AlunoService {
    //GET SERVICES
    static getAlunos = (callback) => {
    axios
        .get(url+"/")
        .then((response) => {
            console.log(response.data)
        callback(response.data);
        })
        .catch((error) => console.log(error));
    };

    static getAlunoById = (id, callback) => {
    axios
        .get(url+`/${id}`)
        .then((response) => {
        callback(response.data);
        })
        .catch((error) => console.log([error,"ERRO AO BUSCAR UM ALUNO POR ID"]));
    };

    static postAluno = (professor, callback) => {
    axios.post(url+"/criar", professor)
        .then((response) => {
            callback(response);
        })
        .catch((error) => console.log(error));
    };

    static updateAluno = (id, professorEditado, callback) => {
    axios
        .put(`http://localhost:3002/professores/${id}`, professorEditado)
        .then((response) => {
            callback(response)
        })
        .catch((error) => console.log(error));
    };

    static deleteAluno = (id, callback) => {
    axios.delete(`http://localhost:3002/professores/${id}`)
        .then(response => {
            callback("ok!")
        })
        .catch( error => console.log(error))
    }
}

export default AlunoService;