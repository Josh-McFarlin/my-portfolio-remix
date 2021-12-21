import React from "react";
import { Form, useTransition, useActionData } from "remix";
import styles from "./EmailForm.module.scss.json";

interface EmailFormProps {
  heading?: string;
  subtitle?: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ heading, subtitle }) => {
  const transition = useTransition();
  const actionData = useActionData();

  React.useEffect(() => {
    console.log("actionData", actionData);
    if (actionData) {
      if (actionData.success) {
        // eslint-disable-next-line no-alert
        alert("Successfully submitted contact form!");
      } else {
        // eslint-disable-next-line no-alert
        alert(
          "An error occurred while submitting the contact form, please try again later!"
        );
      }
    }
  }, [actionData?.success]);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <Form className={styles.form} name="contact" method="post">
          <fieldset disabled={transition.state === "submitting"}>
            <p hidden>
              <label>
                {"Don’t fill this out if you're human:"}
                <input name="bf" type="text" />
              </label>
            </p>

            <label htmlFor="fname">Name</label>
            <input
              className={styles.formInput}
              id="fname"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              defaultValue={actionData ? actionData.values.name : undefined}
            />

            <label htmlFor="femail">ReplyTo</label>
            <input
              className={styles.formInput}
              id="femail"
              name="replyTo"
              type="email"
              placeholder="Your Email"
              required
              defaultValue={actionData ? actionData.values.replyTo : undefined}
            />

            <label htmlFor="fmessage">Message</label>
            <textarea
              className={styles.formInput}
              id="fmessage"
              name="message"
              placeholder="Message"
              required
              defaultValue={actionData ? actionData.values.message : undefined}
            />

            <button className={styles.formButton} type="submit">
              {transition.state === "submitting" ? "Sending..." : "Send"}
            </button>
          </fieldset>
        </Form>
      </div>
    </section>
  );
};

export default EmailForm;
