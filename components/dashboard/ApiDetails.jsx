import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileJson, 
  Database, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  ArrowRight
} from 'lucide-react';

export function ApiDetails({ apiData }) {
  const processEndpoints = (modules) => {
    let stats = {
      GET: { count: 0, items: [] },
      POST: { count: 0, items: [] },
      PATCH: { count: 0, items: [] },
      DELETE: { count: 0, items: [] },
      TOTAL: 0
    };

    const traverse = (items) => {
      items?.forEach(item => {
        if (item.endpoints) {
          item.endpoints.forEach(endpoint => {
            stats.TOTAL++;
            const name = endpoint.toLowerCase();
            
            // Simple heuristic to guess method from name
            if (name.startsWith('get') || name.startsWith('list') || name.startsWith('view') || name.startsWith('search') || name.startsWith('check') || name.startsWith('calculate') || name.startsWith('read') || name.startsWith('access')) {
              stats.GET.count++;
              stats.GET.items.push(endpoint);
            } else if (name.startsWith('delete') || name.startsWith('remove') || name.startsWith('cancel')) {
              stats.DELETE.count++;
              stats.DELETE.items.push(endpoint);
            } else if (name.startsWith('update') || name.startsWith('edit') || name.startsWith('change') || name.startsWith('set') || name.startsWith('mark') || name.startsWith('toggle') || name.startsWith('transfer') || name.startsWith('reschedule') || name.startsWith('reply') || name.startsWith('promote') || name.startsWith('publish') || name.startsWith('moderate') || name.startsWith('feature') || name.startsWith('reset')) {
              stats.PATCH.count++;
              stats.PATCH.items.push(endpoint);
            } else {
              // Default others to POST (Create, Add, Register, Submit, etc.)
              stats.POST.count++;
              stats.POST.items.push(endpoint);
            }
          });
        }
        if (item.subModules) {
          traverse(item.subModules);
        }
      });
    };

    traverse(modules);
    return stats;
  };

  const stats = processEndpoints(apiData?.modules || []);

  const MethodCard = ({ method, count, icon: Icon, color, items }) => (
    <Card className={`border-${color}/20 bg-linear-to-br from-${color}/5 to-card overflow-hidden`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-xl font-bold text-${color}`}>{method}</CardTitle>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
        <CardDescription>{count} endpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-2 w-full bg-secondary/30 rounded-full mb-4">
          <div 
            className={`h-full rounded-full bg-${color}`} 
            style={{ width: `${(count / stats.TOTAL) * 100}%` }}
          />
        </div>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center text-sm p-2 rounded-md hover:bg-background/80 transition-colors">
                <ArrowRight className={`w-3 h-3 mr-2 text-${color}/70`} />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MethodCard 
          method="GET" 
          count={stats.GET.count} 
          icon={Search} 
          color="blue-500" 
          items={stats.GET.items}
        />
        <MethodCard 
          method="POST" 
          count={stats.POST.count} 
          icon={PlusCircle} 
          color="green-500" 
          items={stats.POST.items}
        />
        <MethodCard 
          method="PATCH/PUT" 
          count={stats.PATCH.count} 
          icon={Edit} 
          color="amber-500" 
          items={stats.PATCH.items}
        />
        <MethodCard 
          method="DELETE" 
          count={stats.DELETE.count} 
          icon={Trash2} 
          color="red-500" 
          items={stats.DELETE.items}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-primary" />
            <CardTitle>API Specification Details</CardTitle>
          </div>
          <CardDescription>
            Detailed breakdown of all {stats.TOTAL} endpoints defined in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
            <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
              {JSON.stringify({ 
                project: apiData.project, 
                features: Object.keys(apiData.features || {}),
                modules: apiData.modules?.map(m => m.name),
                statistics: {
                  total: stats.TOTAL,
                  get: stats.GET.count,
                  post: stats.POST.count,
                  patch: stats.PATCH.count,
                  delete: stats.DELETE.count
                }
              }, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
