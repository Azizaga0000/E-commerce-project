import shoppingImg from "@/assets/images/online-shopping-service.png";
import person1 from "@/assets/images/person1.png";
import person2 from "@/assets/images/person2.png";
import person3 from "@/assets/images/person3.png";


export default function About() {
  return (
    <div className="container py-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">Our Story</h2>
          <p className="text-muted">
            Launched in 2015, <strong>Exclusive</strong> is one of South Asia’s
            premier online shopping marketplaces with a strong presence in the
            region. Supported by a wide range of marketing and logistics
            solutions, we have over <strong>15,000 sellers</strong> and{" "}
            <strong>200 brands</strong> serving more than 3 million satisfied
            customers.
          </p>
          <p className="text-muted">
            Our platform offers more than <strong>1 million products</strong> —
            from fashion and electronics to home essentials — all growing at a
            very fast pace.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={shoppingImg}
            alt="Shopping online"
            className="img-fluid rounded-3 shadow-sm"
          />
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-4">
          <img
            src={person1}
            className="mb-3 border-radius-3"
            style={{ width: "70%", height: "80%", objectFit: "cover" }}
          />
          <h5 className="fw-semibold mb-1">Emin Sadiqi</h5>
          <p className="text-muted small mb-2">Founder & Chairman</p>
          <div>
            <i className="bi bi-twitter text-danger me-2"></i>
            <i className="bi bi-instagram text-danger me-2"></i>
            <i className="bi bi-linkedin text-danger"></i>
          </div>
        </div>

        <div className="col-md-4">
          <img
            src={person2}
            className="mb-3 border-radius-3"
            style={{ width: "70%", height: "80%", objectFit: "cover" }}
          />
          <h5 className="fw-semibold mb-1">Iman Imanov</h5>
          <p className="text-muted small mb-2">Managing Director</p>
          <div>
            <i className="bi bi-twitter text-danger me-2"></i>
            <i className="bi bi-instagram text-danger me-2"></i>
            <i className="bi bi-linkedin text-danger"></i>
          </div>
        </div>

        <div className="col-md-4">
          <img
            src={person3}
            className="mb-3 border-radius-3"
            style={{ width: "70%", height: "80%", objectFit: "cover" }}
          />
          <h5 className="fw-semibold mb-1">Nicat Piriyev</h5>
          <p className="text-muted small mb-2">Product Designer</p>
          <div>
            <i className="bi bi-twitter text-danger me-2"></i>
            <i className="bi bi-instagram text-danger me-2"></i>
            <i className="bi bi-linkedin text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
