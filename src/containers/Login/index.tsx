import { Container } from '@mui/material'
import { Formik, FormikHelpers} from 'formik'
import { ErrorResponse, User} from '../../utils/interface/interface'
import { useAppDispatch } from '../../app/hook'
import { loginUser } from '../../features/userSlice'
import { extractError } from '../../utils/common'
import InputBox from '../../components/InputBox'
import { FormStyled } from './login.styled'
import Heading from '../../components/Heading'
import AppButton from '../../components/AppButton'


const Login  = () => {

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
    <Container sx={{justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <FormStyled>
            <Heading text='Login Form'/>
            <InputBox name='email' placeholder='Your email' err={errors.email} touched={touched.email}/>
            <InputBox type='password' name='password' placeholder='Your password' err={errors.password} touched={touched.password}/>
            <AppButton type='submit' text='Login'/>
          </FormStyled>
        )}
      </Formik>
    </Container>
  )

}

export default Login