import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions";
import { fetchJSON } from "@/lib/actions/finnhub.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, Bell, Edit, Trash2 } from "lucide-react";

interface Quote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

interface Profile {
  name: string;
  marketCapitalization: number;
  peRatio: number;
}

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/sign-in");
  const email = session?.user?.email;

  if (!email) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Your Watchlist</h1>
            <p className="text-gray-400">
              Please log in to view your watchlist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const symbols = await getWatchlistSymbolsByEmail(email);

  if (symbols.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Your Watchlist</h1>
            <p className="text-gray-400 mb-4">
              No stocks in your watchlist yet.
            </p>
            <p className="text-sm text-gray-500">
              Add stocks from the search or stock detail pages.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fetch quotes and profiles
  const token =
    process.env.FINNHUB_API_KEY || process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
  if (!token) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-900 p-6 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Stock Data Unavailable</h1>
            <p>API key missing. Please configure FINNHUB_API_KEY.</p>
          </div>
        </div>
      </div>
    );
  }

  const quotePromises = symbols.map((symbol) =>
    Promise.all([
      fetchJSON<Quote>(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(
          symbol
        )}&token=${token}`,
        60
      ),
      fetchJSON<Profile>(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(
          symbol
        )}&token=${token}`,
        3600
      ),
    ]).then(([quote, profile]) => ({ symbol, quote, profile }))
  );

  const results = await Promise.all(quotePromises);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Watchlist</h2>
          <Button variant="outline" size="sm" className="text-white">
            Add Stock
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-700">
                <TableHead className="w-[200px]">Company</TableHead>
                <TableHead className="w-[100px]">Symbol</TableHead>
                <TableHead className="w-[120px]">Price</TableHead>
                <TableHead className="w-[100px]">Change</TableHead>
                <TableHead className="w-[120px]">Market Cap</TableHead>
                <TableHead className="w-[100px]">P/E Ratio</TableHead>
                <TableHead className="w-[100px]">Alert</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map(({ symbol, quote, profile }) => {
                const isPositive = quote?.d && quote.d >= 0;
                const formattedPrice = quote ? `$${quote.c.toFixed(2)}` : "—";
                const formattedChange = quote?.d ? (
                  <span
                    className={isPositive ? "text-green-500" : "text-red-500"}
                  >
                    {isPositive ? "+" : ""}
                    {quote.d.toFixed(2)} ({quote.dp.toFixed(2)}%)
                  </span>
                ) : (
                  "—"
                );
                const formattedMarketCap =
                  results.marketCap > 0
                    ? `$${(results.marketCap / 1e9).toFixed(1)}B`
                    : "—";

                const formattedPERatio =
                  results.peRatio !== null && results.peRatio > 0
                    ? results.peRatio.toFixed(1)
                    : "—";

                return (
                  <TableRow
                    key={symbol}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        {/* <Star className='h-4 w-4 text-yellow-500' /> */}
                        <span>{profile?.name || symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 font-mono">{symbol}</TableCell>
                    <TableCell className="py-3">{formattedPrice}</TableCell>
                    <TableCell className="py-3">{formattedChange}</TableCell>
                    <TableCell className="py-3">{formattedMarketCap}</TableCell>
                    <TableCell className="py-3">{formattedPERatio}</TableCell>
                    <TableCell className="py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-2 py-1"
                      >
                        Add Alert
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Alerts Panel */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Alerts</h2>
          <Button variant="outline" size="sm" className="text-white">
            Create Alert
          </Button>
        </div>
        <div className="space-y-4">
          {results.slice(0, 5).map(({ symbol, quote, profile }) => {
            const isPositive = quote?.d && quote.d >= 0;
            const formattedPrice = quote ? `$${quote.c.toFixed(2)}` : "—";
            const formattedChange = quote?.d ? (
              <span className={isPositive ? "text-green-500" : "text-red-500"}>
                {isPositive ? "+" : ""}
                {quote.d.toFixed(2)} ({quote.dp.toFixed(2)}%)
              </span>
            ) : (
              "—"
            );

            return (
              <div
                key={`alert-${symbol}`}
                className="bg-gray-800 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://logo.clearbit.com/${symbol.toLowerCase()}.com`}
                      alt={symbol}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">
                        {profile?.name || symbol}
                      </div>
                      <div className="text-sm text-gray-400">{symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formattedPrice}</div>
                    <div className="text-xs">{formattedChange}</div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Bell className="h-4 w-4 text-yellow-500" />
                  <span>${`Alert: Price > $240.60`}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                  <Edit className="h-4 w-4" />
                  <Trash2 className="h-4 w-4" />
                  <span className="bg-gray-700 px-2 py-0.5 rounded">
                    Once per day
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
