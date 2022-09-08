import React from 'react'
import Alert from '../components/Alerta'
import Spinner from '../components/Spinner'
import {Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const Formulario = ({cliente,cargando}) => {
  const navigate = useNavigate()
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
              .min(3, 'El nombre es muy corto')
              .max(50, 'El nombre es muy largo')
              .required('El nombre es obligatorio'),
    empresa: Yup.string()
                .min(3, 'El nombre de la empresa es muy corto')
                .max(50, 'El nombre de la empresa es muy largo')
                .required('La empresa es obligatoria'),
    email: Yup.string()
              .email('El email no es válido')
              .required('El email es obligatorio'),
    telefono: Yup.number()
                .positive('El teléfono no puede ser negativo')
                .integer('El teléfono no es válido')
                .typeError('El teléfono debe ser un número')
  })
  const handleSubmit = async(values) => {
    try {
      let respuesta
      if(cliente.id)
      {
        //editando un registro
        const url = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      else{
        //nuevo registro
        const url = 'http://localhost:4000/clientes'
         respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      await respuesta.json()
      navigate('/clientes')
    }catch(error){
      console.log("error", error)
    }
  }
  return (
    cargando?<Spinner/>:
    (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{
          cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'
        }</h1>
    <Formik
    initialValues={
      {
        nombre:cliente?.nombre ?? '',
        empresa:cliente?.empresa ?? '',
        email:cliente?.email ?? '',
        telefono:cliente?.telefono ?? '',
        notas:cliente?.notas ?? ''
    }
    }
    enableReinitialize={true}

    onSubmit={async (valores,{resetForm})=>{
      await handleSubmit(valores)
      resetForm()
    }}
    validationSchema={nuevoClienteSchema}
    >
      {({errors,touched})=>{
        return(
      <Form>
        <div className='mb-4'>
           <label
           className='text-gray-800'
           htmlFor='nombre'
           > Nombre</label>
            <Field
            className='mt-2 block w-full p-3 bg-gray-50'
              type='text'
              id='nombre'
              placeholder='Nombre del Cliente'
              name='nombre'
            />
            {errors.nombre && touched.nombre? 
            <Alert>{errors.nombre}</Alert>
          :null}
        </div>
        <div className='mb-4'>
           <label
           className='text-gray-800'
           htmlFor='empresa'
           > Empresa</label>
            <Field
            className='mt-2 block w-full p-3 bg-gray-50'
              type='text'
              id='empresa'
              placeholder='Nombre de la Empresa'
              name='empresa'
            />
            {errors.empresa && touched.empresa?
            <Alert>{errors.empresa}</Alert>
          :null}
        </div>
        <div className='mb-4'>
           <label
           className='text-gray-800'
           htmlFor='email'
           > Email</label>
            <Field
            className='mt-2 block w-full p-3 bg-gray-50'
              type='email'
              id='email'
              placeholder='Email del Cliente'
              name='email'
            />
            {errors.email && touched.email?
            <Alert>{errors.email}</Alert>
          :null}
        </div>
        <div className='mb-4'>
           <label
           className='text-gray-800'
           htmlFor='telefono'
           > Telefono</label>
            <Field
            className='mt-2 block w-full p-3 bg-gray-50'
              type='tel'
              id='telefono'
              placeholder='Telefono del Cliente'
              name='telefono'
            />
            {errors.telefono && touched.telefono?
            <Alert>{errors.telefono}</Alert>
          :null}
        </div>
        <div className='mb-4'>
           <label
           className='text-gray-800'
           htmlFor='notas'
           > Notas</label>
            <Field
            as='textarea'
            className='mt-2 block w-full p-3 bg-gray-50 h-40'
              type='text'
              id='notas'
              placeholder='Notas del Cliente'
              name='notas'
            />
        </div>
        <input
        type='submit'
        value={ cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'/>
      </Form>
        )
      }
      } 
    </Formik>
   
    </div>
    )
  )
}

Formulario.defaultProps={
 cliente:{},
 cargando:false
}


export default Formulario