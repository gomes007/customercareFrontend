import NavTitle from "@/components/menu/NavTitle";

export default function HomePage() {
  return (
    <>
      <NavTitle
        icon={<i className="bi bi-cart-plus-fill"></i>}
        title="Add Provider "
        path={[
          { name: "Home", link: "/" },
          { name: "List", link: "/" }
        ]}
      />
      <h1>Jesus is the Lord!</h1>
      <p>Thank you my Lord and Savior</p>
    </>
  );
}
