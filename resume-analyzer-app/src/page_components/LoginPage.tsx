





export default function LoginPage() {
    
  return (
    <section className="LoginPage">
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="userName">Username:</label>
          <input type="text" id="userName" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}