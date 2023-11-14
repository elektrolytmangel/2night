export const Add = () => {
  return (
    <div>
      <form className="d-flex flex-column">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="location">Location</label>
        <input type="text" id="location" />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      <p>add</p>
    </div>
  );
};
