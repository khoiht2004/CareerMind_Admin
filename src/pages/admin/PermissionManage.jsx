import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PermissionList from "@/components/admin/PermissionList";
import UserPermissionTable from "@/components/admin/UserPermissionTable";

function PermissionManage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Quản lý phân quyền</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tạo quyền mới và phân quyền chi tiết cho từng người dùng trong hệ
          thống
        </p>
      </div>

      <Tabs defaultValue="permissions">
        <TabsList>
          <TabsTrigger value="permissions">Danh sách quyền</TabsTrigger>
          <TabsTrigger value="users">Phân quyền người dùng</TabsTrigger>
        </TabsList>

        {/*Danh sách quyền*/}
        <TabsContent value="permissions" className="mt-6">
          <PermissionList />
        </TabsContent>

        {/*Phân quyền người dùng*/}
        <TabsContent value="users" className="mt-6">
          <UserPermissionTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PermissionManage;
