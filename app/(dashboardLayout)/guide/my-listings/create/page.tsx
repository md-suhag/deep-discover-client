import CreateListingForm from "@/components/listings/create-listing-form";

export default function CreateListingPage() {
  return (
    <div className="flex flex-col gap-6">
       <h1 className="text-3xl font-bold tracking-tight">Create New Listing</h1>
       <div className="border rounded-lg p-6 bg-card">
         <CreateListingForm />
       </div>
    </div>
  );
}
