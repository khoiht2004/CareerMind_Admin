import { useSearchParams } from "react-router";
import { User, BotMessageSquare, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProfile from "@/components/profileTabs/MyProfile";
import MyChatbot from "@/components/profileTabs/MyChatbot";
import MySettings from "@/components/profileTabs/MySettings";
import { PROFILE_TABS } from "@/config/admin.constants";

const TAB_ICONS = {
  profile: User,
  chatbot: BotMessageSquare,
  settings: Settings,
};

const TAB_CONTENT = {
  profile: <MyProfile />,
  chatbot: <MyChatbot />,
  settings: <MySettings />,
};

function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { user } = useSelector((state) => state.auth);
  const activeTab = searchParams.get("tab") ?? "profile";

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Trang cá nhân</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý thông tin và hoạt động của bạn
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => setSearchParams({ tab: val })}
      >
        <TabsList className="mb-6 h-auto flex-wrap gap-1">
          {PROFILE_TABS.map(({ key, label }) => {
            const Icon = TAB_ICONS[key];
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="cursor-pointer gap-2 px-2 py-2.5 text-sm"
              >
                {Icon && <Icon className="size-4" />}
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {PROFILE_TABS.map(({ key }) => (
          <TabsContent key={key} value={key}>
            {TAB_CONTENT[key]}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default Profile;
