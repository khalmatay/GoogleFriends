const SignUp = ({
  onSubmit,
  handleChangeItem,
  changeAuthMode,
  handleSubmit,
  register,
}) => {
  return (
    <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Sign Up</h3>
        <div className="text-center">
          Already registered?{" "}
          <span className="link-primary" onClick={changeAuthMode}>
            Sign In
          </span>
        </div>
        <div className="form-group mt-3">
          <label>Full Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="form-control mt-1"
            placeholder="e.g Jane Doe"
            onChange={handleChangeItem}
          />
        </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="form-control mt-1"
            placeholder="Email Address"
            onChange={handleChangeItem}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            {...register("password", { required: true })}
            type="password"
            className="form-control mt-1"
            placeholder="Password"
            onChange={handleChangeItem}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          {/* <input class="btn btn-primary" type="submit" value="Submit">Submit</input> */}
        </div>
        <p className="text-center mt-2">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    </form>
  );
};
export default SignUp;
