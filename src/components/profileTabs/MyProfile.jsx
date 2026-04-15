import { useState, useEffect } from "react";
import { Camera, Pencil, Loader2, Building2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetMyCompanyProfileQuery,
  useUpdateMyCompanyProfileMutation,
} from "@/services/company.service";

function MyProfile() {
  const { data: response, isLoading } = useGetMyCompanyProfileQuery();
  const [updateCompany, { isLoading: isSaving }] =
    useUpdateMyCompanyProfileMutation();
  const company = response?.data;

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (company) {
      setName(company.name ?? "");
      setDescription(company.description ?? "");
      setPhone(company.phone ?? "");
      setAddress(company.address ?? "");
    }
  }, [company]);

  const handleSave = async () => {
    try {
      await updateCompany({ name, description, phone, address }).unwrap();
      setEditing(false);
      toast.success("Đã cập nhật thông tin công ty");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Avatar + basic info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-20 w-20 rounded-xl">
                <AvatarImage src={company?.logoUrl} />
                <AvatarFallback className="rounded-xl text-xl font-bold">
                  {company?.name?.[0]?.toUpperCase() ?? "C"}
                </AvatarFallback>
              </Avatar>
              <button className="bg-primary text-primary-foreground absolute -right-2 -bottom-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-90">
                <Camera className="size-3.5" />
              </button>
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h2 className="text-xl font-bold">{company?.name}</h2>
              <p className="text-muted-foreground text-sm">{company?.email}</p>
              <div className="mt-1">
                {company?.isVerified ? (
                  <Badge className="border-blue-200 bg-blue-50 text-blue-600">
                    Đã xác minh
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Chưa xác minh
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Giới thiệu công ty</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => setEditing(!editing)}
            >
              <Pencil className="mr-1 size-3.5" />
              {editing ? "Hủy" : "Chỉnh sửa"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {editing ? (
            <div className="space-y-3">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Giới thiệu về công ty..."
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="cursor-pointer"
                >
                  {isSaving && (
                    <Loader2 className="mr-1 size-3.5 animate-spin" />
                  )}
                  Lưu
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {description || "Chưa có bài giới thiệu..."}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Thông tin liên hệ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">
              Email công ty (Cố định)
            </Label>
            <Input
              defaultValue={company?.email}
              readOnly
              className="bg-muted/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Tên công ty</Label>
            <Input
              placeholder="Nhập tên công ty"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">
              Số điện thoại
            </Label>
            <Input
              placeholder="Chưa cập nhật"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Địa chỉ</Label>
            <Input
              placeholder="Chưa cập nhật cụ thể"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="mt-2 w-full cursor-pointer sm:w-auto"
          >
            {isSaving && <Loader2 className="mr-1 size-4 animate-spin" />}
            Cập nhật thông tin
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProfile;
