import {useState} from "react";
import AlunoService from "../services/AlunoService";
import { useNavigate } from "react-router-dom";

const Criar = () => {

    const[nome,setNome] = useState("")
    const[ira,setIra] = useState(0)
    const[curso,setCurso] = useState("")
    const navigate = useNavigate()

    const handleInputNome = (event) => {
        setNome(event.target.value)
    }

    const handleInputCurso = (event) => {
        setCurso(event.target.value)
    }

    const handleInputIra = (event) => {
        setIra(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        let alunoNovo = {nome, curso, ira}
        AlunoService.postAluno(alunoNovo,(response) => {
            console.log(response)
            navigate("/aluno/listar")
        })
    }

    return(
        <>
        <h1>Criar</h1>
        <form className="form-content" onSubmit={handleSubmit}>
        <div className="mb-3">
                    <label className="form-label" htmlFor="inputNome">Nome</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nome" 
                        id="inputNome"
                        onChange={handleInputNome}
                        value={nome}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label" htmlFor="inputCurso">Curso</label>
                    <input
                        className="form-control"
                        type="text"
                        name="curso"
                        id="inputCurso"
                        onChange={handleInputCurso}
                        value={curso} 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="inputIra">Ira</label> 
                    <input
                        className="form-control"
                        type="number"
                        name="ira"
                        value={ira}
                        id="inputIra"
                        onChange={handleInputIra}
                    />
                </div>
            <div>
                <button type="submit" className="btn btn-primary"> 
                    submit
                </button>
            </div>
        </form>
        </>
    )
}

export default Criar;