import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {loginTC} from "../../state/login-reducer";
import {Redirect} from "react-router-dom";

export const Login = () => {

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      dispatch(loginTC(values))
    },
    validate: (values) => {
      if (!values.email)
      return {
        email: 'email is required',
      }
      if (!values.password)
        return {
          password: 'password is required',
        }
    }
  });
  //если isLoggedIn=true, то нас перенаправляют на главную страницу с тудулистами
  if (isLoggedIn) { return <Redirect to='/'/>}

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'}
                 target={'_blank'}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField label="Email"
                       margin="normal"
                       {...formik.getFieldProps('email')}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <TextField type="password"
                       label="Password"
                       margin="normal"
                       {...formik.getFieldProps('password')}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            <FormControlLabel label={'Remember me'}
                              control={<Checkbox
                                 {...formik.getFieldProps('rememberMe')}
                                 checked={formik.values.rememberMe}
                              />}
            />
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}