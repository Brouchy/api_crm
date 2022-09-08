import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useEffect,useState } from "react"
import { object } from "yup"
const VerCliente = () => {
    //lee el dato de la url
    const {id} = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    useEffect(()=>{
        const obtenerCliente = async()=>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
                setCargando(!cargando)
        }
        obtenerCliente()
    },[])
    
  return (
    <div>
        {cargando ? <Spinner/>: Object.keys(cliente).length=== 0? <h1>No Hay resultados</h1> :(
            <>
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                    <p className='mt-3'>Informacion del cliente</p>
                
                    <p className="mt-10 text-2xl text-gray-600">
                    <span className="uppercase font-bold text-gray-800"> Cliente: </span>
                    {cliente.nombre}
                    </p> 
                    <p className="text-2xl text-gray-600">
                    <span className="uppercase font-bold text-gray-800"> Email: </span>
                      {cliente.email}
                    </p> 
                    {cliente.telefono && (
                        <p className="text-2xl text-gray-600">
                        <span className="uppercase font-bold text-gray-800"> Telefono: </span>
                        {cliente.telefono}
                        </p> 
                    )    
                    }
                    <p className="text-2xl text-gray-600">
                    <span className="uppercase font-bold text-gray-800"> Empresa: </span>
                {cliente.empresa}
                    </p> 
                    {
                        cliente.notas && (
                            <p className="text-2xl text-gray-600">
                            <span className="uppercase font-bold text-gray-800"> Notas: </span>
                        {cliente.notas}
                            </p> 
                        )    
                    }
            </>
        )}

    </div>
  )
}

export default VerCliente