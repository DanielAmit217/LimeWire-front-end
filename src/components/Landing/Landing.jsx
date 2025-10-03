import "./Landing.css";

const Landing = () => {
  return (
    <main>
      <div className="greet-msg">
        <div className="logo"> <img src="/src/assets/limewirelogo.webp" /></div>
        <p>
          <em>Lime Wire</em> is an app for managing audio files such as sound
          effects, Foley, and music samples. Each user can log into their
          account, upload their own sound files, and search through what other
          users have uploaded. Sounds can be discovered by name or by tags.
          Users can like each sound, and the main page will display sounds
          ranked by most to least likes. They can also comment on other users’
          sounds, enabling discussion and feedback. Each user can edit their own
          uploads—at the MVP level, this means changing the name or tags. A
          stretch goal is to support in-app audio editing, such as reversing or
          time-stretching a file, and change Pitch
        </p>
      </div>
    </main>
  );
};

export default Landing;
