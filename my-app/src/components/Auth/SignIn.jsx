
const SignIn = ({ onSubmit, handleChangeItem, changeAuthMode, handleSubmit, register }) => {
    return( 
<form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
		            onChange={handleChangeItem} // стандартный вызов функции
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                 {...register("password", { required: true })}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleChangeItem} 
              />
            </div>
            <div className="d-grid gap-2 mt-3">
           
                <button type="submit" className="btn btn-primary" >
                Submit
                </button>
                {/* <input class="btn btn-primary" type="submit" value="Submit">Submit</input> */}
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>    )
}
export default SignIn