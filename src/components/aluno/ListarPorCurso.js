import { useEffect, useState } from "react"

import AlunoService from "../services/AlunoService"

const ListarPorCurso = () =>{

    const[ArrayAluno, setArray] = useState(<></>)
    const[alunos, setAlunos] = useState([])
    const cursos = [
        "Sistemas de informação",
        "Ciência da Computação",
        "Design Digital",
        "Engenharia de Software",
        "Redes de Computadores",
        "Sistemas de informação"
    ]

    useEffect(
        () =>
        {
            AlunoService.getAlunos((response) => {setAlunos(response)})
            setArray(corporable())
        },
        []
    )

    const corporable =() =>{
        let array = cursos.map((curso) => {
            let alunos = alunos.map((aluno) => {
                if(aluno.curso === curso)
                    return aluno
            })
            return {curso, alunos}
        })
        console.log(array)
        const arrayAluno = alunos.map(
            (aluno) => {
                return(
                    <tr>
                        <th scope="row">{aluno.nome}</th>
                        <th>{aluno.curso}</th>
                        <th>{aluno.ira}</th>
                    </tr>
                )
            }
        )
        return arrayAluno;
    }

    return(
        <div className="page-contant">
            <h1>Lista de Alunos</h1>
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
                    {ArrayAluno}
                </tbody>
            </table>
        </div>
    )
}

export default ListarPorCurso