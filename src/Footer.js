export default function Footer() {
  let linkedin = "https://www.linkedin.com/in/sangeetha-jula-b302171a4/";
  let twitter = "https://twitter.com/sangeetha_jula";
  return (
    <div className="footer">
      <p>©️ | {new Date().getFullYear()} | Sangeetha J💌 </p>
      <div>
        {[linkedin, twitter].map((item, i) => {
          return (
            <a key={item} href={item}>
              <img
                className="footer-icon"
                src={`../images/footer-${i + 1}.png`}
                alt="footer icon"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
