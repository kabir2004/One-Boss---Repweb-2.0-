"use client"

import { 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Settings, 
  User, 
  ShoppingCart,
  ChevronDown,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

// Interface type - can be 'advisor', 'admin', 'manager', etc.
type InterfaceType = 'advisor' | 'admin' | 'manager'

export default function Content() {
  // This would come from user context/auth in a real app
  const [interfaceType] = useState<InterfaceType>('advisor')
  
  const [activeWidgets, setActiveWidgets] = useState([
    'assets-by-plan-type',
    'assets-by-supplier', 
    'estatement-signup',
    'top-five-clients'
  ])
  const [showConfig, setShowConfig] = useState(false)

  const allWidgets = [
    { id: 'assets-by-plan-type', name: 'Assets By Plan Type', type: 'pie' },
    { id: 'assets-by-supplier', name: 'Assets By Supplier', type: 'pie' },
    { id: 'estatement-signup', name: 'eStatement Signup', type: 'donut' },
    { id: 'top-five-clients', name: 'Top Five Clients', type: 'bar' },
    { id: 'top-five-products', name: 'Top Five Products', type: 'bar' },
    { id: 'top-five-products-performance', name: 'Top Five Products Performance', type: 'line' }
  ]

  const toggleWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      setActiveWidgets(activeWidgets.filter(id => id !== widgetId))
    } else if (activeWidgets.length < 4) {
      setActiveWidgets([...activeWidgets, widgetId])
    }
  }

  const renderWidget = (widgetId: string) => {
    switch (widgetId) {
      case 'assets-by-plan-type':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Assets By Plan Type</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 78% 0%, 78% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400" style={{ clipPath: 'polygon(50% 50%, 78% 50%, 78% 0%, 100% 0%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-muted-foreground">RRSP</span>
                </div>
                <span className="font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">RRIF</span>
                </div>
                <span className="font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-muted-foreground">OPEN</span>
                </div>
                <span className="font-medium">16%</span>
              </div>
            </div>
          </div>
        )
      case 'assets-by-supplier':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Assets By Supplier</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 77% 0%, 77% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400" style={{ clipPath: 'polygon(50% 50%, 77% 50%, 77% 0%, 100% 0%, 100% 50%)' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-muted-foreground">CIG</span>
                </div>
                <span className="font-medium">27%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-muted-foreground">MMF</span>
                </div>
                <span className="font-medium">14%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-muted-foreground">MFC</span>
                </div>
                <span className="font-medium">14%</span>
              </div>
            </div>
          </div>
        )
      case 'estatement-signup':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">eStatement Signup</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative w-24 h-24">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white"></div>
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}></div>
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-muted" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-muted-foreground">eStatement</span>
                </div>
                <span className="font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-muted-foreground">Mail Delivery</span>
                </div>
                <span className="font-medium">75%</span>
              </div>
            </div>
          </div>
        )
      case 'top-five-clients':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Top Five Clients</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-3 bg-blue-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">Sharma, Melanie</div>
                  <div className="text-muted-foreground">~$1.7M</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-3 bg-green-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">Martinez, Neil</div>
                  <div className="text-muted-foreground">~$550K</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-3 bg-purple-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">Salinas, Gus</div>
                  <div className="text-muted-foreground">~$400K</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-3 bg-orange-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">Mueller, Oliver</div>
                  <div className="text-muted-foreground">~$300K</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 bg-red-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">Robertson, Name</div>
                  <div className="text-muted-foreground">~$250K</div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'top-five-products':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Top Five Products</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-16 h-3 bg-blue-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">MANULIFE DIVIDEND INCOME FUND</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-14 h-3 bg-green-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">CI MONEY MARKET FUND</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-3 bg-purple-600 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">NBI ALTAMIRA CASHPERFORMER ACCOUNT</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-3 bg-orange-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">CI CANADIAN DIVIDEND FUND A ISC</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-3 bg-red-500 rounded"></div>
                <div className="flex-1 text-xs">
                  <div className="font-medium text-card-foreground">CI HIGH INCOME FUND A ISC</div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'top-five-products-performance':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Top Five Products Performance</h3>
            </div>
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Performance trends over time</p>
                <p className="text-xs text-muted-foreground mt-1">Line chart visualization</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Manulife Dividend</span>
                <span className="font-medium text-green-600">+12.5%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">CI Money Market</span>
                <span className="font-medium text-green-600">+8.2%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">NBI Altamira</span>
                <span className="font-medium text-red-600">-2.1%</span>
              </div>
            </div>
          </div>
        )
      case 'recent-activity':
  return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Recent Activity</h3>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-card-foreground">New account opened</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-card-foreground">Trade submitted</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
          </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-card-foreground">Client approval sent</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
              </div>
            </div>
          </div>
        )
      case 'performance-summary':
        return (
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-card-foreground">Performance Summary</h3>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Portfolio Growth</span>
                <span className="text-xs font-bold text-green-600">+8.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Client Satisfaction</span>
                <span className="text-xs font-bold text-blue-600">94%</span>
            </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Active Tasks</span>
                <span className="text-xs font-bold text-purple-600">23</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  // Determine which widgets to show based on interface type
  const getWidgetsForInterface = () => {
    const baseWidgets = ['assets-by-plan-type', 'assets-by-supplier', 'estatement-signup', 'top-five-clients']
    if (interfaceType === 'admin') {
      return [...baseWidgets, 'top-five-products', 'top-five-products-performance']
    }
    return baseWidgets
  }

  // Row 1: 4 tiles - Key Metrics
  const row1Widgets = [
    { id: 'total-aum', label: 'ASSETS UNDER MANAGEMENT', value: '$127.4M', change: '+2.3% this month', icon: DollarSign, color: 'green' },
    { id: 'active-accounts', label: 'ACTIVE ACCOUNTS', value: '1,247', change: '+12 new this week', icon: Users, color: 'blue' },
    { id: 'avg-account-size', label: 'AVERAGE ACCOUNT SIZE', value: '$102.2K', change: '+5.1% vs last month', icon: Target, color: 'purple' },
    { id: 'fund-families', label: 'FUND FAMILIES', value: '24', change: '3 new partnerships', icon: TrendingUp, color: 'orange' }
  ]

  // Row 2: 3 tiles - Charts (conditional based on interface)
  const row2Widgets = interfaceType === 'admin' 
    ? ['assets-by-plan-type', 'assets-by-supplier', 'estatement-signup']
    : ['assets-by-plan-type', 'assets-by-supplier', 'estatement-signup']

  // Row 3: 4 tiles - Analytics
  const row3Widgets = interfaceType === 'admin'
    ? ['top-five-clients', 'top-five-products', 'top-five-products-performance', 'fund-categories']
    : ['top-five-clients', 'fund-categories', 'recent-activity', 'performance-summary']

  // Row 4: 5 tiles - Work In Progress
  const row4Widgets = [
    { id: 'trading', label: 'Trading', icon: TrendingUp, color: 'blue', items: [
      { label: 'Unsubmitted Trades', count: 2, hoverColor: 'red' },
      { label: 'Submit a Trade', count: 0, hoverColor: 'green' }
    ]},
    { id: 'account-opening', label: 'Account Opening', icon: Users, color: 'green', items: [
      { label: 'My Drafts', count: 12, hoverColor: 'yellow' },
      { label: 'Submitted for Review', count: 0, hoverColor: 'blue' },
      { label: 'Ensemble Drafts', count: 6, hoverColor: 'yellow' },
      { label: 'Awaiting Ensemble Response', count: 4, hoverColor: 'orange' },
      { label: 'Imported from Ensemble', count: 4, hoverColor: 'green' }
    ]},
    { id: 'kyc-update', label: 'KYC Update', icon: User, color: 'purple', items: [
      { label: 'My Drafts', count: 12, hoverColor: 'yellow' },
      { label: 'Submitted for Review', count: 0, hoverColor: 'blue' },
      { label: 'Denied Review', count: 3, hoverColor: 'red' }
    ]},
    { id: 'client-approval', label: 'Client Approval', icon: CheckCircle, color: 'emerald', items: [
      { label: 'My Drafts', count: 0, hoverColor: 'yellow' },
      { label: 'Sent to Client', count: 0, hoverColor: 'blue' },
      { label: 'Expired', count: 13, hoverColor: 'red' }
    ]},
    { id: 'faxing', label: 'Faxing', icon: TrendingUp, color: 'orange', items: [
      { label: 'My Drafts', count: 5, hoverColor: 'yellow' },
      { label: 'Fax Error', count: 5, hoverColor: 'red' }
    ]}
  ]

  const renderFundCategories = () => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-card-foreground">Top Fund Categories</h3>
      </div>
      <div className="flex-1 space-y-3">
        <div>
                <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Canadian Equity</span>
            <span className="text-xs font-bold text-card-foreground">$45.2M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35.5%' }}></div>
                </div>
              </div>
        <div>
                <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Fixed Income</span>
            <span className="text-xs font-bold text-card-foreground">$38.7M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '30.4%' }}></div>
                </div>
              </div>
        <div>
                <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">US Equity</span>
            <span className="text-xs font-bold text-card-foreground">$28.9M</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
  )

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4">
      {/* Row 1: 4 tiles - Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
        {row1Widgets.map((widget) => {
          const Icon = widget.icon
          const colorClasses = {
            green: 'text-green-600',
            blue: 'text-blue-600',
            purple: 'text-purple-600',
            orange: 'text-orange-600'
          }
          return (
            <div key={widget.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-w-0 flex flex-col">
              <h3 className="text-sm font-medium text-muted-foreground truncate mb-3">{widget.label}</h3>
              <div className="flex items-center gap-2">
                <Icon className={`h-8 w-8 flex-shrink-0 ${colorClasses[widget.color as keyof typeof colorClasses]}`} />
                <p className="text-2xl font-bold text-card-foreground truncate">{widget.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Row 2: 3 tiles - Charts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-card-foreground">Charts and Analytics</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowConfig(!showConfig)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {showConfig ? 'Hide Configure' : 'Configure'}
              </Button>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
        {row2Widgets.map((widgetId) => (
          <div key={widgetId} className="min-w-0">
                {renderWidget(widgetId)}
              </div>
            ))}
          </div>

          {/* Widget Configuration Panel */}
          {showConfig && (
          <div className="p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-card-foreground mb-3">
                Widget Configuration ({activeWidgets.length}/4 Active)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allWidgets.map((widget) => (
                  <Button
                    key={widget.id}
                    variant={activeWidgets.includes(widget.id) ? "default" : "outline"}
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => toggleWidget(widget.id)}
                    disabled={!activeWidgets.includes(widget.id) && activeWidgets.length >= 4}
                  >
                    <TrendingUp className="h-3 w-3 mr-2" />
                    {widget.name}
                    {activeWidgets.includes(widget.id) && (
                      <CheckCircle className="h-3 w-3 ml-auto" />
                    )}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Click widgets to toggle them on/off. Maximum 4 widgets can be active at once.
              </p>
            </div>
          )}
      </div>

      {/* Row 3: 4 tiles - Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 w-full">
        {row3Widgets.map((widgetId) => {
          if (widgetId === 'fund-categories') {
            return <div key={widgetId} className="min-w-0">{renderFundCategories()}</div>
          }
          return (
            <div key={widgetId} className="min-w-0">
              {renderWidget(widgetId)}
            </div>
          )
        })}
            </div>

      {/* Row 4: 5 tiles - Work In Progress */}
      <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-card-foreground">Work In Progress</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
        {row4Widgets.map((widget) => {
          const Icon = widget.icon
          const bgColorClasses = {
            blue: 'bg-blue-100',
            green: 'bg-green-100',
            purple: 'bg-purple-100',
            emerald: 'bg-emerald-100',
            orange: 'bg-orange-100'
          }
          const iconColorClasses = {
            blue: 'text-blue-600',
            green: 'text-green-600',
            purple: 'text-purple-600',
            emerald: 'text-emerald-600',
            orange: 'text-orange-600'
          }
          const hoverColorMap: Record<string, string> = {
            red: 'hover:bg-red-600 hover:border-red-600',
            green: 'hover:bg-green-600 hover:border-green-600',
            yellow: 'hover:bg-yellow-600 hover:border-yellow-600',
            blue: 'hover:bg-blue-600 hover:border-blue-600',
            orange: 'hover:bg-orange-600 hover:border-orange-600'
          }
          return (
            <div key={widget.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow min-h-[280px] flex flex-col min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 ${bgColorClasses[widget.color as keyof typeof bgColorClasses]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${iconColorClasses[widget.color as keyof typeof iconColorClasses]}`} />
                </div>
                <h3 className="font-medium text-card-foreground text-sm truncate">{widget.label}</h3>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto">
                {widget.items.map((item, idx) => (
                  <Button 
                    key={idx}
                    className={`w-full flex items-center justify-between p-2 text-xs bg-white border border-border hover:text-white h-8 transition-colors group min-w-0 ${hoverColorMap[item.hoverColor] || ''}`}
                  >
                    <span className="text-muted-foreground group-hover:text-white text-xs font-medium truncate">{item.label}</span>
                    <span className="text-muted-foreground group-hover:text-white text-xs font-medium flex-shrink-0 ml-2">{item.count}</span>
                </Button>
                ))}
              </div>
            </div>
          )
        })}
              </div>
      </div>
    </div>
  )
}
