import {useEffect, useState} from 'react'
import {Logo, FormRow} from '@/components/'
import Wrapper from '@/styles/wrappers/RegisterPage.tsx'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {loginUser, registerUser} from '@/store/features/user/userSlice.ts'
import {useAppSelector, useAppDispatch} from '@/store/hooks.ts'
import {SubmitFormEvent, UpdateFormEvent} from "@/types/app.definitions.ts";

/* Component State Template */
const initialState = {
    email: '',
    password: '',
    isMember: false
}

function Register() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isLoading, user} = useAppSelector(store => store.user)
    const [values, setValues] = useState(initialState)

    // EFFECT - NAVIGATE TO DASHBOARD
    /* User is Valid */
    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user])

    // FORM CHANGE INPUT VALUE
    const handleChange = (event: UpdateFormEvent) => {
        const name = event.target.name
        const value = event.target.value
        setValues({...values, [name]: value})
    }

    // FORM EVENT HANDLER
    const handleSubmit = (e: SubmitFormEvent) => {
        e.preventDefault()
        const {email, password, isMember} = values
        /*No Email, No Password, No Member + No Name*/
        if (!email || !password) {
            toast.warning('Input all the fields')
            return
        }
        /* Member Action, Dispatch Login*/
        if (isMember) {
            dispatch(loginUser({email, password}))
            return
        }
        /* Default Action - Register User */
        dispatch((registerUser({email, password})))
    }

    // EVENT HANDLER
    function toggleMember() {
        setValues({...values, isMember: !values.isMember})
    }

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={handleSubmit}>
                {/*HEADER*/}
                <Logo/>
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>

                {/*INPUT FIELDS */}

                <FormRow type="email" name="email" value={values.email} handleChange={handleChange}/>
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>

                {/*SUBMIT FORM BUTTON*/}
                <button type="submit"
                    className="btn btn-block"
                    disabled={isLoading}>
                    {isLoading ? 'loading...' : 'submit'}
                </button>

                {/*DEMO USER */}
                <button type="button"
                    className="btn btn-hipster btn-block"
                    disabled={isLoading}
                    onClick={() => {
                        dispatch(loginUser({email: 'testUser@test.com', password: 'secret'}))
                    }}>
                    {isLoading ? 'loading...' : 'demo'}
                </button>


                {/* TOGGLE LOG-IN TO REGISTER*/}
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type="button" className="member-btn" onClick={toggleMember}>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    )
}

export default Register
