import EditListingForm from "@/components/listings/edit-listing-form";
import { getListingById } from "@/services/listings";

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { id } = await params; // Next 15+ needs await, if user is on older next, this might warn but is safe if params is trusted. Wrapper handles it.
  // Actually on Next 16 params is a Promise.
  
  const result = await getListingById(id);
  const listing = result?.data;

  if (!listing) {
      return <div>Listing not found</div>
  }

  return (
    <div className="flex flex-col gap-6">
      <EditListingForm listing={listing} />
    </div>
  );
}
