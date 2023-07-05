import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "../styles/Home.module.css";

export default Home;

function Home() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.string()
      .required("Date of Birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "** Required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  return (
    <div className={styles.cardLayout}>
      <h5 className={styles.card}>Next.js - Form Validation Example</h5>
      <div className={styles.cardBody}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label>Title</label>
              <select
                name="title"
                {...register("title")}
                className={`${errors.title ? "is-invalid" : ""}`}
              >
                <option value=""></option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
              </select>
              <div className={styles.invalidFeedback}>
                {errors.title?.message}
              </div>
            </div>
            <div className={styles.formField}>
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                {...register("firstName")}
                className={`${errors.firstName ? "is-invalid" : ""}`}
              />
              <div className={styles.invalidfeedback}>
                {errors.firstName?.message}
              </div>
            </div>
            <div className={styles.formField}>
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                {...register("lastName")}
                className={`${errors.lastName ? "is-invalid" : ""}`}
              />
              <div className={styles.invalidfeedback}>
                {errors.lastName?.message}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.formField}>
              <label>Date of Birth</label>
              <input
                name="dob"
                type="date"
                {...register("dob")}
                className={`${errors.dob ? "is-invalid" : ""}`}
              />
              <div className={styles.invalidfeedback}>
                {errors.dob?.message}
              </div>
            </div>
            <div className={styles.formField}>
              <label>Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`${errors.email ? "is-invalid" : ""}`}
              />
              <div className={styles.invalidfeedback}>
                {errors.email?.message}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className={styles.formField}>
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`${errors.password ? "is-invalid" : ""}`}
              />
              <div className={styles.invalidfeedback}>
                {errors.password?.message}
              </div>
            </div>
            <div className={styles.formField}>
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`${errors.confirmPassword ? "is-invalid" : ""}`}
              />
              <div className={styles.invalidfeedback}>
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.formCheck}>
              <input
                name="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
                id="acceptTerms"
                className={`form-check-input ${
                  errors.acceptTerms ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="acceptTerms" className={styles.formCheckInput}>
                Accept Terms & Conditions
              </label>
              <div className={styles.invalidfeedback}>
                {errors.acceptTerms?.message}
              </div>
            </div>
          </div>
          <div className={styles.formField}>
            <button type="submit" className={styles.subButton}>
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className={styles.subButton}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
