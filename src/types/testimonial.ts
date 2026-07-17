export type TestimonialStatus = "pending" | "approved" | "rejected";

export type StoredTestimonial = {
  id: string;
  submittedAt: string;
  updatedAt: string;
  name: string;
  email: string;
  className: string;
  text: string;
  anonymous: boolean;
  publishConsent: true;
  status: TestimonialStatus;
};

export type PublicTestimonial = {
  id: string;
  displayName: string;
  className: string;
  text: string;
};
