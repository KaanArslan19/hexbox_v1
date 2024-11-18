"use client";
import React, { useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Steps } from "antd";
import { WaitListCampaignInfo } from "@/app/types";
import { Turnstile } from "next-turnstile";

const steps = [
  { title: "Introduction" },
  { title: "Project Details" },
  { title: "Review" },
];

const FILE_SIZE_LIMIT = 1024 * 1024;
const fileSizeValidator = Yup.mixed().test(
  "fileSize",
  "File size must be less than 1MB",
  (value: unknown) => {
    if (value instanceof File) {
      return value.size <= FILE_SIZE_LIMIT;
    }
    return true;
  }
);

const validationSchema = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    mail: Yup.string()
      .email("Invalid email format")
      .required("E-mail address is required"),
  }),
  Yup.object({
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    predictedFundAmount: Yup.number()
      .typeError("Fund amount must be a number")
      .required("Fund amount is required")
      .min(0.0000001, "Fund amount must be greater than 0"),
    solanaWalletAddress: Yup.string().required("Wallet address is required"),
  }),
];

const initialValues = {
  name: "",
  surname: "",
  mail: "",
  description: "",
  location: "",
  discord: "",
  telegram: "",
  website: "",
  linkedIn: "",
  predictedFundAmount: 0,
  solanaWalletAddress: "",
  "cf-turnstile-response": "",
};

interface Props {
  onSubmit(token: string, values: WaitListCampaignInfo): void;
  onImageRemove?(source: string): void;
}

const ReviewSection = ({ values }: { values: typeof initialValues }) => {
  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Name", value: values.name },
        { label: "Surname", value: values.surname },
        { label: "Email", value: values.mail },
      ],
    },
    {
      title: "Project Details",
      fields: [
        { label: "Description", value: values.description },
        { label: "Location", value: values.location },
        {
          label: "Predicted Fund Amount",
          value: `$${Number(values.predictedFundAmount).toLocaleString()}`,
        },
        { label: "Solana Wallet Address", value: values.solanaWalletAddress },
      ],
    },
    {
      title: "Social Links",
      fields: [
        { label: "Discord", value: values.discord || "Not provided" },
        { label: "Telegram", value: values.telegram || "Not provided" },
        { label: "LinkedIn", value: values.linkedIn || "Not provided" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-medium mb-4">{section.title}</h3>
          <div className="space-y-3">
            {section.fields.map((field) => (
              <div key={field.label} className="flex flex-col">
                <span className="text-sm text-gray-600">{field.label}</span>
                <span className="font-medium break-words">
                  {field.value || "Not provided"}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function WaitListForm(props: Props) {
  const { onSubmit, onImageRemove } = props;
  const [isPending, setIsPending] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logo, setLogo] = useState<File | null>(null);
  const [walletInfo, setWalletInfo] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    "success" | "error" | "expired" | "required"
  >("required");
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const handleSubmit = async (values: typeof initialValues) => {
    setIsPending(true);
    const projectData: WaitListCampaignInfo = {
      name: values.name,
      surname: values.surname,
      mail: values.mail,
      description: values.description,
      location: values.location,
      discord: values.discord,
      telegram: values.telegram,
      linkedIn: values.linkedIn,
      website: values.website,
      predictedFundAmount: values.predictedFundAmount,
      solanaWalletAddress: values.solanaWalletAddress,
    };
    try {
      console.log(values);
      console.log("site key: ", process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
      // if (turnstileStatus !== "success") {
      //   console.log("no token: ", values["cf-turnstile-response"]);
      //   return;
      // }
      const token = values["cf-turnstile-response"];
      await onSubmit(token, projectData);
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[currentStep]}
      onSubmit={handleSubmit}
    >
      {({ validateForm, setFieldValue, submitForm, values }) => (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="p-6 max-w-2xl mx-auto"
        >
          <h1 className="text-3xl text-center mb-4">Join Waitlist</h1>
          <p className="text-md mb-8 font-thin text-center">
            Fill out this form to join waitlist.
          </p>
          <div className="mb-6">
            <Steps
              progressDot
              current={currentStep}
              responsive
              items={steps.map((step, index) => ({
                title: step.title,
                description:
                  index < currentStep
                    ? "Completed"
                    : index === currentStep
                    ? "In Progress"
                    : "Pending",
              }))}
            />
          </div>
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl mb-2">Introduction</h2>
              <p className="text-md mb-8 font-thin">
                Introduce yourself and your project.
              </p>
              <h3 className="text-xl mb-2">First Name</h3>
              <Field
                name="name"
                type="text"
                placeholder="Name"
                className="block w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blueColor"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-redColor mb-2"
              />
              <h3 className="text-xl mb-2">Surname</h3>
              <Field
                name="surname"
                placeholder="Surname"
                className="block w-full p-2 border border-gray-300 rounded mb-8 focus:outline-none focus:border-blueColor"
              />
              <ErrorMessage
                name="surname"
                component="div"
                className="text-redColor mb-2"
              />
              <h3 className="text-xl mb-2">Email</h3>
              <Field
                name="mail"
                placeholder="Mail"
                className="block w-full p-2 border border-gray-300 rounded mb-8 focus:outline-none focus:border-blueColor"
              />
              <ErrorMessage
                name="mail"
                component="div"
                className="text-redColor mb-2"
              />
            </div>
          )}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl mb-2">Project Details</h2>
              <p className="text-md mb-8 font-thin">
                Describe your project, its objectives and the amount of funding
                you`re seeking.
              </p>
              <h3 className="text-xl mb-2">Project Description</h3>
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="block w-full p-2 border border-gray-300 rounded h-32 mb-8 focus:outline-none focus:border-blueColor"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-redColor mb-2"
              />
              <h3 className="text-xl mb-2">
                Project Location (City & Country)
              </h3>
              <Field
                name="location"
                placeholder="Location"
                className="block w-full p-2 border border-gray-300 rounded mb-8 focus:outline-none focus:border-blueColor"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-redColor mb-2"
              />
              <div className="flex items-center mb-2">
                <h3 className="text-xl mr-2">Social Links</h3>
                <p>(optional)</p>
              </div>

              <Field
                name="discord"
                placeholder="Discord Address"
                className="block w-full p-2 border border-gray-300 rounded mb-8 focus:outline-none focus:border-blueColor"
              />
              <Field
                name="telegram"
                placeholder="Telegram Address"
                className="block w-full p-2 border border-gray-300 rounded mb-8 focus:outline-none focus:border-blueColor"
              />
              <Field
                name="linkedIn"
                placeholder="LinkedIn Address"
                className="block w-full p-2 border border-gray-300 rounded mb-8 focus:outline-none focus:border-blueColor"
              />

              <h3 className="text-xl mb-2">Desired Funding Amount ($)</h3>
              <Field
                name="predictedFundAmount"
                type="text"
                placeholder="Desired Funding Amount"
                className="block w-full p-2 border border-gray-300 focus:border-blueColor rounded mb-4 focus:outline-none"
                min="0"
              />
              <ErrorMessage
                name="predictedFundAmount"
                component="div"
                className="text-redColor mb-2"
              />

              <h3 className="text-xl mb-2">Your Your Solana wallet address</h3>
              <Field
                name="solanaWalletAddress"
                type="text"
                placeholder="Solana Wallet Address"
                className="block w-full p-2 border border-gray-300 focus:border-blueColor rounded mb-4 focus:outline-none"
                min="1"
              />
              <ErrorMessage
                name="solanaWalletAddress"
                component="div"
                className="text-redColor mb-2"
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl mb-2">Review</h2>
              <p className="text-md mb-8 font-thin">
                For this final step, please review all information carefully.
                Once submitted, the details provided here will be fixed and
                cannot be changed. Ensure accuracy before completing your
                submission.
              </p>
              <ReviewSection values={values} />
              <div className="mt-8">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                  retry="auto"
                  refreshExpired="auto"
                  sandbox={process.env.NEXT_PUBLIC_NODE_ENV === "development"}
                  onError={() => {
                    console.error("turnstile error");
                    setTurnstileStatus("error");
                    setTurnstileError(
                      "Security check failed. Please try again."
                    );
                  }}
                  onExpire={() => {
                    console.log("turnstile expired");
                    setTurnstileStatus("expired");
                    setTurnstileError(
                      "Security check expired. Please verify again."
                    );
                  }}
                  onLoad={() => {
                    console.log("turnstile loaded");
                    setTurnstileStatus("required");
                    setTurnstileError(null);
                  }}
                  onVerify={(token) => {
                    console.log("turnstile verified");
                    setFieldValue("cf-turnstile-response", token);
                    setTurnstileStatus("success");
                    setTurnstileError(null);
                  }}
                />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded ${
                currentStep === 0
                  ? "bg-lightBlueColor"
                  : "bg-blueColor text-white"
              }`}
            >
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                className="px-4 py-2 bg-blueColor text-white rounded"
                onClick={() => {
                  if (!isPending) submitForm();
                }}
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  validateForm().then((errors) => {
                    console.log("Validation Errors:", errors);
                    if (Object.keys(errors).length === 0) {
                      setCurrentStep((prev) => prev + 1);
                    }
                  })
                }
                className="px-4 py-2 bg-blueColor text-white rounded"
              >
                Next
              </button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
}
