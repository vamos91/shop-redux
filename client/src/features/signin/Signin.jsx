import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap'
import { getUser } from './signinSlice'
import { useNavigate } from 'react-router-dom'

function Signin() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('Tre77@gmail.com')
  const [pass, setPass] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signin = async (e) => {
    e.preventDefault();
    const user = await fetch('/users/signin', {
      method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    })
    if(user.status === 200){
      const userJson = await user.json()
      console.log('salut', userJson)
      dispatch(getUser(userJson))
      navigate('/')
    }else{
      setError(true)
    }

  }


  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {
        error && (
          <Alert color="danger">
            Bad login or password
          </Alert>
        )
      }
      <Form style={{ width:'400px' }} onSubmit={signin}>
          <FormGroup>
          <Label>
            Email
          </Label>
          <Input
            name="email"
            placeholder="with a placeholder"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            Password
          </Label>
          <Input
            name="password"
            placeholder="password placeholder"
            type="password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </FormGroup>
        <Button type='submit' style={{width: '100%'}}>Login</Button>
        </Form>
    </div>

  )
}

export default Signin