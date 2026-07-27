



export default function RegisterPage() {
  return (
   <section className="RegisterPage">
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="userName">Username:</label>
          <input type="text" id="userName" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

