import { Container } from '@mui/material'
import { Form, Formik, Field, FormikHelpers} from 'formik'
import { ErrorResponse, User} from '../../utils/interface/interface'
import { useAppDispatch } from '../../app/hook'
import { loginUser } from '../../features/userSlice'
import { extractError } from '../../utils/common'


const Login: React.FC<{}>  = () => {

  const dispatch = useAppDispatch()

  const handleSubmit = async (values: User, actions: FormikHelpers<User>)=>{
    const {email, password} = values
    
    try{
      await dispatch(loginUser({email, password}))
    }
    catch(error)
    {
      const err = JSON.parse((error as Error).message as string) as ErrorResponse
      if(err.fieldError)
      {
        const errs = extractError(err.fieldError)
        actions.setErrors(errs)
        console.log(errs)
      }
      else{
        alert(err.msg)
      }
    } 
    
  }

  const initialValues: User = {
    email: '',
    password: '',
  }

  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            {touched.email && errors.email && <div>{errors.email}</div>}

            <Field name="password" />
            {touched.password && errors.password && <div>{errors.password}</div>}

            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </Container>
  )

}

export default Login