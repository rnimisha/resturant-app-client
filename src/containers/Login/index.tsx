import { Container } from '@mui/material'
import { Form, Formik, Field} from 'formik'
import { User } from '../../utils/interface/interface'
import { useAppDispatch } from '../../app/hook'
import { loginUser } from '../../features/userSlice'

function Login() {

  const dispatch = useAppDispatch()

  const onSubmit = (values: User)=>{
    const {email, password} = values
    dispatch(loginUser({email, password}))
  }
  return (
    <Container maxWidth="lg">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          onSubmit(values)
        }}
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