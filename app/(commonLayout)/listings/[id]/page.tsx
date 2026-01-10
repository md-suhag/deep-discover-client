import { getListingById } from "@/services/listings";
import ListingDetailsContent from "@/components/modules/listings/ListingDetailsContent";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const res = await getListingById(id);

    if (!res?.success || !res?.data) {
        return {
            title: "Listing Not Found",
        };
    }

    return {
        title: `${res.data.title} | Deep Discover`,
        description: res.data.description,
    };
}

export default async function ListingDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const res = await getListingById(id);

    if (!res?.success || !res?.data) {
        notFound();
    }

    return (
        <ListingDetailsContent listing={res.data} />
    );
}
