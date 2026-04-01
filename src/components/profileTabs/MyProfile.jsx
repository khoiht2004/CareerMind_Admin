import { useState, useEffect } from "react";
import { Camera, Pencil, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/services/profile.service";

function MyProfile() {
  const { data: response, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const profile = response?.data;

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({ bio, phone, address }).unwrap();
      setEditing(false);
      toast.success("Đã cập nhật thông tin");
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
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatarUrl} />
                <AvatarFallback className="text-xl font-bold">
                  {profile?.fullName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button className="bg-primary text-primary-foreground absolute -right-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-90">
                <Camera className="size-3.5" />
              </button>
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h2 className="text-lg font-bold">{profile?.fullName}</h2>
              <p className="text-muted-foreground text-sm">
                {profile?.user?.email}
              </p>
              <Badge variant="secondary" className="text-xs">
                {profile?.user?.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Giới thiệu bản thân</CardTitle>
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Giới thiệu về bản thân..."
              />
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="cursor-pointer"
              >
                {isSaving && <Loader2 className="size-3.5 animate-spin" />}
                Lưu
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {bio || "Chưa có giới thiệu"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Email</Label>
            <Input
              defaultValue={profile?.user?.email}
              readOnly
              className="bg-muted/40"
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
              placeholder="Chưa cập nhật"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="sm"
            className="h-8 cursor-pointer px-4 py-2.5 text-[14px] font-medium"
          >
            {isSaving && <Loader2 className="size-3.5 animate-spin" />}
            Lưu thay đổi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProfile;
