import { useEffect, useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { BlockList } from './BlockList';
import { BlockStats } from './BlockStats';
export default function EnhancedBlocksTab({
  timeRange,
}: {
  timeRange: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateBlocks, setAnimateBlocks] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        setAnimateBlocks(true);
      }, 500);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const blockVisualizationData = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: `block-${i}`,
      height: 1250 + i,
      size: Math.floor(Math.random() * 900) + 300,
      transactions: Math.floor(Math.random() * 20) + 5,
      timestamp: new Date(Date.now() - (24 - i) * 3600000).toISOString(),
      miner: [`miner1`, `miner2`, `miner3`, `miner4`][
        Math.floor(Math.random() * 4)
      ],
      difficulty: (Math.random() * 5 + 8).toFixed(2),
      confirmations: 24 - i,
      color: i % 2 === 0 ? 'blue' : i % 3 === 0 ? 'purple' : 'emerald',
    }));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up ">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-blue-400 tracking-tight flex items-center gap-2 drop-shadow-md">
            <Layers className="h-7 w-7 text-blue-500 animate-pulse" />
            Block Explorer
          </h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">
            Explore the latest blocks in the network with detailed insights.
          </p>
        </div>
        {/* <div className="flex items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-300">Recent Blocks</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {timeRange === "week" && "Blocks mined in the last 7 days"}
                    {timeRange === "month" && "Blocks mined in the last 30 days"}
                    {timeRange === "quarter" && "Blocks mined in the last 90 days"}
                    {timeRange === "year" && "Blocks mined in the last 365 days"}
                  </p>
                </div>
              </div>*/}
      </div>

      {/* Views */}
      <div className="relative border border-blue-500/20 rounded-2xl p-6 bg-gradient-to-br from-black via-slate-900 to-black shadow-lg shadow-blue-500/10 backdrop-blur-md overflow-hidden transition-all duration-300 min-h-[400px]">
        {viewMode === 'list' && (
          <BlockList
            blockVisualizationData={blockVisualizationData}
            animateBlocks={animateBlocks}
            isLoaded={isLoaded}
          />
        )}
      </div>

      {/* Stats section */}
      <div className="rounded-xl bg-gradient-to-r from-slate-900/70 to-black border border-gray-800/40 p-4 shadow-inner shadow-black/20">
        <BlockStats />
      </div>
    </div>
  );
}
