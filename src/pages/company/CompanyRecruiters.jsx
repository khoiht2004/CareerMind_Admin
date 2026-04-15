import CompanyRecruiterTable from "@/components/company/CompanyRecruiterTable";

function CompanyRecruiters() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Nhân sự công ty</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Danh sách tất cả thành viên thuộc công ty của bạn
        </p>
      </div>

      <CompanyRecruiterTable />
    </div>
  );
}

export default CompanyRecruiters;
