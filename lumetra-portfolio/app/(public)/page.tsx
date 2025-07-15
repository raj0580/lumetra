import Hero from "@/components/public/Hero";
import ServicesSection from "@/components/public/ServicesSection";
import PortfolioGrid from "@/components/public/PortfolioGrid";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

// Fetch data on the server
async function getHomePageData() {
  const servicesQuery = query(collection(firestore, "services"), orderBy("title"), limit(3));
  const portfolioQuery = query(collection(firestore, "portfolio"), orderBy("createdAt", "desc"), limit(6));

  const servicesSnapshot = await getDocs(servicesQuery);
  const services = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const portfolioSnapshot = await getDocs(portfolioQuery);
  const portfolio = portfolioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { services, portfolio };
}

export default async function HomePage() {
  // Using placeholder data for initial render, fetching real data would be similar
  const { services, portfolio } = await getHomePageData();

  return (
    <div>
      <Hero />
      <ServicesSection services={services} />
      <PortfolioGrid items={portfolio} />
    </div>
  );
}