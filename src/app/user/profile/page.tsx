"use client";

import GuardedFrontendPage from "../../auth/GuardedFrontendPage";
import UserInfo from "./userInfo";
import ProfileCard from "@/components/ProfileCard";
import GoogleMapsBuilder from "@/app/components/googleMapsBuilder";

export default function UserProfilePage() {
  return (
    <GuardedFrontendPage>
      {({ user, profile }) => (
        <div>
          <UserInfo user={user} profile={profile} />
          {profile && (
            <ProfileCard
              name={profile.full_name ?? undefined}
              title={"Software Engineer"}
              handle={user?.email?.split("@")[0] ?? "user"}
              contactText="Contact Me"
              avatarUrl={"/people/img1.png"}
              miniAvatarUrl={profile.avatar_url ?? undefined}
              iconUrl="/icons/icon-grid.png"
              showUserInfo
              enableTilt
              enableMobileTilt
            />
          )}
          {profile && profile.address && (
            <GoogleMapsBuilder address={profile.address} />
          )}
        </div>
      )}
    </GuardedFrontendPage>
  );
}
