import { useState } from 'react'
import { FormRow } from '../../components/'
import Wrapper from '../../assets/wrappers/DashboardFormPage.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../../store/features/user/userSlice.jsx'
function Profile () {

  // GLOBAL STATE
  const { isLoading, user } = useSelector(store => store.user)
  const dispatch = useDispatch()

  // COMPONENT STATE
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  // DESTRUCTURE STATE
  const { name, email, lastName, location } = userData

  // EVENT HANDLER (INPUT)
  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setUserData({ ...userData, [inputName]: inputValue })
  }

  // EVENT HANDLER (SUBMIT FORM)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location) {
      toast.error('Fill all the fields')

    }

      dispatch(updateUser(userData))
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow type="text" name="name" value={name} handleChange={handleChange}/>
          <FormRow type="text" name="lastName" value={lastName} handleChange={handleChange} labelText="Last Name"/>
          <FormRow type="text" name="email" value={email} handleChange={handleChange}/>
          <FormRow type="text" name="location" value={location} handleChange={handleChange}/>
          <button className="btn" type="submit">
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile