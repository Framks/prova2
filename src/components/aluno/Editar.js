import "../css/css-form.css"
//import ProfessorFirebaseService from "../services/ProfessorFirebaseService"
import AlunoService from "../services/AlunoService"
//import FIREBASE_CONTEXT from "../utils/FirebaseContext"

import { useContext, useEffect, useState } from "react"
import { useParams,useNavigate } from "react-router-dom"

const Editar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState(0)

   // const firebase = useContext(FIREBASE_CONTEXT)
    const {id} = useParams() 
    const navigate = useNavigate()

    useEffect(
        () => {
            AlunoService.getAlunoById(
                id,
                (professor) => {
                    const { nome, curso, ira } = professor;
                    setNome(nome)
                    setCurso(curso)
                    setIra(ira) 
                }
            )
        }
        ,
        []
    ) 
    
    const handleInputNome = (event) => {
        setNome(event.target.value)
    }

    const handleInputCurso = (event) => {
        setCurso(event.target.value)
    }

    const handleInputIra = (event) => {
        setIra(event.target.event)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const alunoEditado = {nome,curso,ira}
        
        AlunoService.updateAluno(
            id,
            alunoEditado,
            (response) => {
                navigate("/aluno/listar")
            }
        ) 
    }
    
    return (
        <div className="page-content">
            <h1>Editar Alunos</h1>
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
                
                <div className="div-button-submit">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{marginLeft:0}}
                    >
                        Atualizar
                    </button>
                </div>

            </form>
        </div>
        
    )
}

export default Editar;