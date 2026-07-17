"use client";

import { use, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import MainLayout from "@/components/layouts/MainLayout";
import Breadcrumb from "@/components/Breadcrumb";
import Loader from "@/components/Loader";
import HotelSection from "@/components/hotels/HotelSection";
import RestaurentSection from "@/components/restaurent/RestaurentSection";
import TransportSection from "@/components/transports/TransportSection";
import { useHospitalListStore } from "@/stores/hospitalList";
import { capitalize, truncateText } from "@/lib/helpers";
import { Icon } from "@iconify/react";
export default function HospitalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const details = useHospitalListStore((s) => s.details);
  const hospital = useHospitalListStore((s) => s.hospital) as Record<
    string,
    unknown
  >;
  const loader = useHospitalListStore((s) => s.loader);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Record<number, "procedures" | "staff">>({});
  const [openDepartment, setOpenDepartment] = useState<number | null>(null);
  const [submittedAmbulanceRequest, setSubmittedAmbulanceRequest] =
    useState(false);
  const [ambulanceRequest, setAmbulanceRequest] = useState({
    name: "",
    phone: "",
    pickup_location: "",
    dropoff_location: "",
    preferred_time: "",
  });

  useEffect(() => {
    details(id);
  }, [id, details]);

  const submitAmbulanceRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        ...ambulanceRequest,
        hospital_id: id,
      };

      if (requestData.preferred_time) {
        requestData.preferred_time = requestData.preferred_time.replace("T", " ") + ":00";
      }

      await fetch("https://admin.clickhospitals.com/api/store-ambulance-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      setSubmittedAmbulanceRequest(true);
      setShowModal(false);
      setAmbulanceRequest({
        name: "",
        phone: "",
        pickup_location: "",
        dropoff_location: "",
        preferred_time: "",
      });
    } catch (error) {
      console.error("Error submitting ambulance request:", error);
    } finally {
      setLoading(false);
    }
  };

  const title = capitalize(String(hospital.title || hospital.name || ""));
  const description = String(hospital.description || "");
  const phone = String(hospital.phone || "");
  const websiteUrl = String(hospital.website_url || "");
  const mapUrl = String(hospital.google_map_location || "");
  const imageUrls = (hospital.image_urls as string[]) || [];
  const treatments =
    (hospital.treatments as { id: number; name: string }[]) || [];
  const staff =
    (hospital.staff as {
      id: number;
      name: string;
      description?: string;
      image_url?: string;
    }[]) || [];
  const hotels = (hospital.hotels as Record<string, unknown>[]) || [];
  const restaurants = (hospital.restaurants as Record<string, unknown>[]) || [];
  const transports = (hospital.transports as Record<string, unknown>[]) || [];

  if (loader && !title) {
    return (
      <MainLayout>
        <div className="text-center py-5">
          <Loader />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <main className="container mt-4">
        <Breadcrumb
          items={[
            { label: "Home", link: "/" },
            { label: "Hospitals", link: "/hospitals" },
            { label: title, active: true },
          ]}
        />

        {imageUrls.length > 0 && (
          <div className="image-gallery ">
            <div className="main-image">
              <img
                src={imageUrls[0]}
                alt={title}
                className="img-fluid rounded"
              />
            </div>
            {imageUrls.length > 1 && (
              <div className="thumbnail-grid">
                {imageUrls.slice(1, 5).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${title} ${i + 1}`}
                   
                    
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <ul className="nav page-tabs mb-4">
          {[
            "overview",
            "procedures",
            "medical-staff",
            "hotels",
            "restaurants",
            "how-to-get-there",
          ].map((tab) => (
            <li key={tab} className="nav-item">
              <a className="nav-link" href={`#${tab}`}>
                {tab
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            </li>
          ))}
        </ul>

        <div id="overview" className="row">
          <div className="col-lg-8">
            <div className="mb-4">
              <p className="text-muted">
                <i className="bi bi-geo-alt me-2" />
                {String(hospital.address || "")}
              </p>

              <div className="hospital-title-section">
                <h2>{title}</h2>
              </div>
            </div>
            <div className="card card-body rating-summary-card mb-4">
              <div className="row w-100 mb-3 g-2">
                <div className="col-12 col-md-2 align-items-center">
                  <div className="rating-item">
                    <div className="value">
                      {Number((hospital as any)?.rating || 0).toFixed(1)}
                    </div>
                    <div className="stars text-warning">
                      {Array.from({ length: 5 }, (_, i) => {
                        const star = i + 1;
                        const rating = Number(hospital?.rating || 0);

                        if (star <= Math.floor(rating)) {
                          return <Icon key={star} icon="carbon:star-filled" />;
                        }

                        if (
                          star === Math.floor(rating) + 1 &&
                          rating % 1 >= 0.5
                        ) {
                          return <Icon key={star} icon="carbon:star-half" />;
                        }

                        return <Icon key={star} icon="carbon:star" />;
                      })}
                    </div>
                    <div>
                      <span style={{ fontSize: "13px" }}>Google Ratings</span>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-9 d-flex flex-wrap align-items-center category-card-wrapper gap-2 ml-4">
                  <span className="category-card">
                    Doctor <span>{(hospital as any)?.staff_count || 0}</span>
                  </span>
                  <span className="category-card">
                    Facilities <span>4.8</span>
                  </span>
                  <span className="category-card">
                    Staff <span>4.9</span>
                  </span>
                  <span className="category-card">
                    Language assistance <span>4.8</span>
                  </span>
                  <span className="category-card">
                    Support <span>4.9</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="card card-body rating-summary-card mb-4">
              <ul className="hospital-contact-info list-unstyled mb-0 d-flex flex-wrap gap-4">
                {hospital && (
                  <li>
                    <i className="bi bi-geo-alt me-2" />
                    {String(hospital.address || "")}
                  </li>
                )}

                {phone && (
                  <li>
                    <a
                      style={{ color: "rgb(5, 56, 98)" }}
                      href={`tel:${phone}`}
                    >
                      <i
                        style={{ color: "rgb(5, 56, 98)" }}
                        className="bi bi-telephone me-1"
                      />
                      {phone}
                    </a>
                  </li>
                )}
                {websiteUrl && (
                  <li>
                    <a
                      style={{ color: "rgb(5, 56, 98)" }}
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i
                        style={{ color: "rgb(5, 56, 98)" }}
                        className="bi bi-globe me-1"
                      />
                      Website
                    </a>
                  </li>
                )}
                {mapUrl && (
                  <li>
                    <a
                      style={{ color: "rgb(5, 56, 98)" }}
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i
                        style={{ color: "rgb(5, 56, 98)" }}
                        className="bi bi-map me-1"
                      />
                      Map
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="mb-5">
              <h4>About</h4>
              <p>{showMore ? description : truncateText(description, 300)}</p>
              {description.length > 300 && (
                <button
                  className="btn btn-link p-0"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              )}

              <ul className="list-unstyled">
                <li className="info d-flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.417 22.5H4.00033C3.38149 22.5 2.78799 22.2542 2.35041 21.8166C1.91282 21.379 1.66699 20.7855 1.66699 20.1667V6.16667C1.66699 5.54783 1.91282 4.95434 2.35041 4.51675C2.78799 4.07917 3.38149 3.83333 4.00033 3.83333H18.0003C18.6192 3.83333 19.2127 4.07917 19.6502 4.51675C20.0878 4.95434 20.3337 5.54783 20.3337 6.16667V13.1667M15.667 1.5V6.16667M6.33366 1.5V6.16667M1.66699 10.8333H20.3337M14.5003 20.1667L16.8337 22.5L21.5003 17.8333"
                      stroke="#053862"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span v-if="(hospital as any)?.foundation_year">
                    {new Date().getFullYear() -
                      new Date((hospital as any).foundation_year).getFullYear()}
                    'th Year of Foundation
                  </span>
                </li>
                <li
                  className="info d-flex"
                  v-if="(hospital as any)?.staff_count"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 23 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.26673 12.0667C6.02905 12.0667 4.84207 11.575 3.9669
										 10.6998C3.09173 9.82466 2.60006 8.63768 2.60006 7.4V3.66667C2.60006
										  3.41913 2.6984 3.18174 2.87343 3.0067C3.04847 2.83167 
										  3.28586 2.73334 3.5334 2.73334H4.46673C4.71427 2.73334
										   4.95166 2.635 5.1267 2.45997C5.30173 2.28493 5.40006 
										   2.04754 5.40006 1.8C5.40006 1.55247 5.30173 1.31507 5.1267
										    1.14004C4.95166 0.965002 4.71427 0.866669 4.46673 
											0.866669H3.5334C2.79079 0.866669 2.0786 1.16167 
											1.5535 1.68677C1.0284 2.21187 0.733398 2.92406 0.733398 3.66667V7.4C0.734598 8.45442 0.991719 9.4928 1.48268 10.4259C1.97364 11.3591 2.68376 12.1591 3.55206 12.7573C4.38714
											 13.4921 5.06427 14.3889 5.54237 15.3932C6.02047 16.3976 6.28959 17.4885 6.3334 
											 18.6C6.3334 20.3328 7.02173 21.9945 8.24697 23.2198C9.47221 24.445 11.134 25.1333
											  12.8667 25.1333C14.5995 25.1333 16.2613 24.445 17.4865 23.2198C18.7117 21.9945 
											  19.4001 20.3328 19.4001 18.6V17.536C20.2799 17.3088 21.0466 16.7686 
											  21.5566 16.0165C22.0666 15.2645 22.2848 14.3522 22.1703 13.4508C22.0558
											   12.5494 21.6165 11.7207 20.9347 11.12C20.2529 10.5193 19.3754 10.1879
											    18.4667 10.1879C17.5581 10.1879 16.6806 10.5193 15.9988 11.12C15.317 
												11.7207 14.8776 12.5494 14.7632 13.4508C14.6487 14.3522 14.8669
												 15.2645 15.3768 16.0165C15.8868 16.7686 16.6536 17.3088 17.5334
												  17.536V18.6C17.5334 19.8377 17.0417 21.0247 16.1666
												   21.8998C15.2914 22.775 14.1044 23.2667 12.8667 
												   23.2667C11.6291 23.2667 10.4421 22.775 9.5669
												    21.8998C8.69173 21.0247 8.20006 19.8377 8.20006 18.6C8.24623 17.4872 
													8.51826 16.3953 8.99961 15.3909C9.48097 14.3865 10.1616 13.4905 
													11.0001 12.7573C11.8649 12.157 12.5714 11.3561 13.0591 10.4231C13.5467 
													9.49007 13.801 8.45277 13.8001 7.4V3.66667C13.8001 2.92406 13.5051 2.21187 
													12.98 1.68677C12.4549 1.16167 11.7427 0.866669 11.0001 0.866669H10.0667C9.8192
													 0.866669 9.5818 0.965002 9.40676 1.14004C9.23173 1.31507 9.1334 1.55247 9.1334 
													 1.8C9.1334 2.04754 9.23173 2.28493 9.40676 2.45997C9.5818 2.635 9.8192 2.73334 
													 10.0667 2.73334H11.0001C11.2476 2.73334 11.485 2.83167 11.66 3.0067C11.8351 
													 3.18174 11.9334 3.41913 11.9334 3.66667V7.4C11.9334 8.01284 11.8127 8.61967 
													 11.5782 9.18586C11.3436 9.75204 10.9999 10.2665 10.5666 10.6998C10.1332 
													 11.1332 9.61877 11.4769 9.05259 11.7114C8.4864 11.946 7.87957 12.0667 7.26673 
													 12.0667ZM18.4667 15.8C17.9717 15.8 17.4969 15.6033 17.1468 
													 15.2533C16.7967 14.9032 16.6001 14.4284 16.6001 13.9333C16.6001
													  13.4383 16.7967 12.9635 17.1468 12.6134C17.4969 12.2633 17.9717 
													  12.0667 18.4667 12.0667C18.9618 12.0667 19.4366 12.2633 19.7867 12.6134C20.1367 12.9635 20.3334 13.4383
													   20.3334 13.9333C20.3334 14.4284 20.1367 14.9032 19.7867 15.2533C19.4366 15.6033
													    18.9618 15.8 18.4667 15.8Z"
                      fill="#053862"
                    />
                  </svg>

                  <span>{(hospital as any).staff_count || 0} doctors</span>
                </li>

                <div id="procedures"></div>
                <div id="medical-staff"></div>
              </ul>
            </div>
            {treatments.length > 0 && (
              <div className="mb-5 pb-5 section-base custom-collapse">
                <h3 className="section-title">Departments</h3>
                <div className="accordion" id="departments-accordion">
                  {treatments.map((treatment) => {
                    const isOpen = openDepartment === treatment.id;
                    const selectedTab = activeTab[treatment.id] || "procedures";

                    return (
                      <div key={treatment.id} className="accordion-item mb-3 border rounded">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            onClick={() => setOpenDepartment(isOpen ? null : treatment.id)}
                          >
                            {treatment.name}
                          </button>
                        </h2>
                        {isOpen && (
                          <div className="accordion-collapse show">
                            <div className="accordion-body">
                              <ul className="nav nav-tabs mb-3">
                                <li className="nav-item">
                                  <button
                                    type="button"
                                    className={`nav-link ${selectedTab === "procedures" ? "active" : ""}`}
                                    onClick={() => setActiveTab((prev) => ({ ...prev, [treatment.id]: "procedures" }))}
                                  >
                                    Procedures
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    type="button"
                                    className={`nav-link ${selectedTab === "staff" ? "active" : ""}`}
                                    onClick={() => setActiveTab((prev) => ({ ...prev, [treatment.id]: "staff" }))}
                                  >
                                    Medical Staff
                                  </button>
                                </li>
                              </ul>

                              {selectedTab === "procedures" && (
                                <div className="row mt-4">
                                  {(treatment as { children?: { id: number; name: string }[] }).children?.length ? (
                                    (treatment as { children?: { id: number; name: string }[] }).children!.map((subTreatment) => (
                                      <div key={subTreatment.id} className="col-md-4 mb-3">
                                        <div className="card p-3 h-100">{subTreatment.name}</div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-muted">No procedures listed for this department.</p>
                                  )}
                                </div>
                              )}

                              {selectedTab === "staff" && (
                                <div className="row g-3 mt-2">
                                  {staff.length > 0 ? (
                                    staff.map((member) => (
                                      <div key={member.id} className="col-md-6">
                                        <div className="card p-3 d-flex flex-row align-items-center gap-3">
                                          {member.image_url && (
                                            <img
                                              src={member.image_url}
                                              alt={member.name}
                                              className="rounded-circle"
                                              width={60}
                                              height={60}
                                            />
                                          )}
                                          <div>
                                            <h6 className="mb-1">{member.name}</h6>
                                            <p className="small text-muted mb-0">{member.description || "Medical staff"}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-muted">No medical staff listed.</p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

		    <div className="col-lg-4">
            <div className="card p-4 sticky-top sidebar-card  custom-fixed-sidebar" style={{ top: 100 }}>

{Array.isArray(hospital?.image_urls) && hospital.image_urls.length > 0 && (
				<div className="map-placeholder mb-3">
					<img
						style={{ width: "310px", height: "210px", objectFit: "cover" }}
						src={String(hospital.image_urls[0])}
						alt="Hospital"
						loading="lazy"
					/>
				</div>
			)}
					
					<div className="hospital-header d-flex align-items-center justify-content-between">
					<h5 className="hospital-name text-truncate">
					{title}
					</h5>

					<div className="rating d-flex align-items-center ms-2">
						<div className="rating-score">
						{Number(hospital?.average_rating || 0).toFixed(1)}
						</div>

						<Icon icon="carbon:star-filled" className="stars text-warning" />
					</div>
					</div>

				<div className="hospital-location-section">
				<Icon
					icon="material-symbols:location-on-outline"
					style={{ color: "#053862" }}
				/>
				<p className="text-muted ms-0 ps-2">  {String(hospital.address || "")}</p>
				</div>

				<div
				className="info-buttons d-flex gap-2 flex-wrap"
				style={{ marginTop: 10 }}
				>
				{hospital && (
					<a
					href={`tel:${String(hospital.phone || "")}`}
					className="btn btn-sm btn-light"
					>
					<Icon
						icon="bi:telephone"
						style={{
						color: "#053862",
						marginRight: 5,
						fontSize: 18,
						}}
					/>
					Call
					</a>
				)}

				{hospital && (
					<a
					href={String(hospital.website_url || "")}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-sm btn-light"
					>
					<Icon
						icon="streamline-plump:web-remix"
						style={{
						color: "#053862",
						marginRight: 5,
						fontSize: 18,
						}}
					/>
					Website
					</a>
				)}

				{hospital && (
					<a
					href={String(hospital.google_map_location || "")}
					target="_blank"
					rel="noopener noreferrer"
					className="btn btn-sm btn-light"
					>
					<Icon
						icon="material-symbols:location-on-outline"
						style={{
						color: "#053862",
						marginRight: 5,
						fontSize: 18,
						}}
					/>
					Google Map
					</a>
				)}
				</div>
            </div>

            <div className="card card-body sidebar-card custom-fixed-sidebar ambulance-request-card mt-3 sticky-top">
              
          

            {submittedAmbulanceRequest && (
              <div
                className="alert alert-success ambulance-success"
                role="alert"
              >
                Your request has been sent. The hospital will contact you
                shortly.
              </div>
            )}
			  
			  <div
                className="ambulance-card-header mb-4"
                style={{ marginBottom: 120 }}
              >
                <img   style={{ width: "50px", height: "50px" }}
                  src="/assets/img/Background.png"
                  alt="Ambulance request"
                  className="ambulance-card-image"
                />
                <h5 className="ambulance-card-title">
                  Request Ambulance Information from Hospital
                </h5>
				  </div>
		         <p className="ambulance-disclaimer mt-3">
                     Disclaimer: This form is provided for convenience only. We act solely as a service provider and will forward your request to the selected hospital on a best-effort basis. We do not guarantee a response, availability, or any outcome. For urgent or critical needs, please contact the hospital directly.
                </p>
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={() => setShowModal(true)}
              >
                Request Now
              </button>
            </div>

            {showModal && (
              <div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Request Ambulance</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      />
                    </div>
                    <div className="modal-body">
                      <form onSubmit={submitAmbulanceRequest}>
                        <div className="mb-3">
                          <label htmlFor="modal-name" className="form-label">
                            Name
                          </label>
                          <input
                            id="modal-name"
                            value={ambulanceRequest.name}
                            onChange={(e) =>
                              setAmbulanceRequest((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            type="text"
                            className="form-control"
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="modal-phone" className="form-label">
                            Phone
                          </label>
                          <input
                            id="modal-phone"
                            value={ambulanceRequest.phone}
                            onChange={(e) =>
                              setAmbulanceRequest((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            type="tel"
                            className="form-control"
                            placeholder="123-456-7890"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="modal-pickup" className="form-label">
                            Pickup Location
                          </label>
                          <input
                            id="modal-pickup"
                            value={ambulanceRequest.pickup_location}
                            onChange={(e) =>
                              setAmbulanceRequest((prev) => ({
                                ...prev,
                                pickup_location: e.target.value,
                              }))
                            }
                            type="text"
                            className="form-control"
                            placeholder="Enter pickup location"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="modal-dropoff" className="form-label">
                            Dropoff Location
                          </label>
                          <input
                            id="modal-dropoff"
                            value={ambulanceRequest.dropoff_location}
                            onChange={(e) =>
                              setAmbulanceRequest((prev) => ({
                                ...prev,
                                dropoff_location: e.target.value,
                              }))
                            }
                            type="text"
                            className="form-control"
                            placeholder="Enter dropoff location"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="modal-time" className="form-label">
                            Preferred Time
                          </label>
                          <input
                            id="modal-time"
                            value={ambulanceRequest.preferred_time}
                            onChange={(e) =>
                              setAmbulanceRequest((prev) => ({
                                ...prev,
                                preferred_time: e.target.value,
                              }))
                            }
                            type="datetime-local"
                            className="form-control"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-danger w-100"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit Request"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
           </div>
			<div> 

		  <RestaurentSection
            restaurants={
              restaurants as unknown as Parameters<
                typeof RestaurentSection
              >[0]["restaurants"]
            }
          />
          <HotelSection
            hotels={
              hotels as unknown as Parameters<typeof HotelSection>[0]["hotels"]
            }
          />
          <TransportSection
            items={
              transports as unknown as Parameters<
                typeof TransportSection
              >[0]["items"]
            }
          />
</div>
        
      
      </main>
    </MainLayout>
  );
}
