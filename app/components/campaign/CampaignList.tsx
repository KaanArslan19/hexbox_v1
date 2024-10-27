import { Fragment } from "react";
import ProjectItem from "./CampaignItem";
import { CampaignListProps } from "@/app/types";

const CampaignList: React.FC<CampaignListProps> = ({ listings }) => {
  return (
    <Fragment>
      <div className="flex flex-col items-center my-8  mx-auto">
        <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {listings.map((item) => (
            <ProjectItem
              key={item._id}
              id={item._id}
              userId={item.user_id}
              title={item.title}
              description={item.description}
              fundAmount={item.fund_amount}
              logo={item.logo}
              backgroundImage={item.background_image}
              hexboxAddress={item.hexbox_address}
              status={item.status}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default CampaignList;
