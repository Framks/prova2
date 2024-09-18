import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import AlunoService from "../services/AlunoService";

const Listar = () => {

    const[alunos, setAlunos] = useState([])
    const[arrayTable, setArray] = useState(<></>)

    useEffect(
        () => {
            AlunoService.getAlunos((alunos) => {
                setAlunos(alunos)
                const val = corporable(alunos)
                setArray(val)
            })
            
        }, []
    );



    function handleCor(event){
        let n_ira = 0
        let soma = 0
        let media = 0
        const arrayAluno = alunos.map(
            (aluno) => {
                if(aluno.ira < 7){
                    n_ira = n_ira+1
                    soma = soma+ (Number) (aluno.ira)
                    return(
                        <tr className="bg-danger">
                            <th className="bg-danger" scope="row">{aluno.nome}</th>
                            <th className="bg-danger">{aluno.curso}</th>
                            <th className="bg-danger">{aluno.ira}</th>
                            <th className="bg-danger">
                                <Link to={`/aluno/editar/${aluno.id}`} className="btn btn-primary">Editar</Link>
                                <button type="button" onClick={() => handleDelete(aluno.id)} className="btn btn-danger">Excluir</button>
                            </th>
                        </tr>
                    )
                }else{
                    n_ira = n_ira+1
                    soma = soma+ (Number) (aluno.ira)
                    return(
                        <tr className="bg-danger">
                            <th scope="row">{aluno.nome}</th>
                            <th >{aluno.curso}</th>
                            <th >{aluno.ira}</th>
                            <th >
                                <Link to={`/aluno/editar/${aluno.id}`} className="btn btn-primary">Editar</Link>
                                <button type="button" onClick={() => handleDelete(aluno.id)} className="btn btn-danger">Excluir</button>
                            </th>
                        </tr>
                    )
                }
            }
        )
        media = soma/n_ira
        arrayAluno.push(
            <tr>
                <th colspan="3">Total Media</th>
                <th>{media}</th>
            </tr>
        )
        setArray(arrayAluno);
    }

    const handleDelete = (id) =>{
        AlunoService.deleteAluno(id, (response) => {
            let vetornovo = alunos.filter(aluno => aluno.id !== id)
            setAlunos(vetornovo)
        })
    }

    const corporable =(alunos) =>{
        let n_ira = 0
        let soma = 0
        let media = 0
        const arrayAluno = alunos.map(
            (aluno) => {
                n_ira = n_ira+1
                soma = soma+ (Number) (aluno.ira)
                return(
                    <tr key={aluno.id}>
                        <th scope="row">{aluno.nome}</th>
                        <th>{aluno.curso}</th>
                        <th>{aluno.ira}</th>
                        <th>
                            <Link to={`/aluno/editar/${aluno.id}`} className="btn btn-primary">Editar</Link>
                            <button type="button" onClick={() => handleDelete(aluno.id)} className="btn btn-danger">Excluir</button>
                        </th>
                    </tr>
                )
            }
        )
        media = soma/n_ira
        arrayAluno.push(
            <tr >
                <th colSpan="3" className="bg-primary text-white">Total Media</th>
                <th className="bg-primary text-white">{media}</th>
            </tr>
        )
        return arrayAluno;
    }
    
    return(
        <div className="page-contant">
            <h1>Lista de Alunos</h1>
            <button className="btn btn-danger" onClick={() => {handleCor()}}>Pintar</button>
            <table className="table table-striped table-content">
                <thead>
                    <tr>
                        <th scope="col">nome</th>
                        <th scope="col">Curso</th>
                        <th scope="col">IRA</th>
                        <th scope="col">Edições</th>
                    </tr>
                </thead>
                <tbody>
                    {arrayTable}
                </tbody>
            </table>
        </div>
    )
}

export default Listar;