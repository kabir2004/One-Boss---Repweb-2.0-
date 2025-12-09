"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import {
  AlertTriangle,
  Mail,
  FileText,
  Shield,
  DollarSign,
  TrendingUp,
  Phone,
  MapPin,
  CheckCircle,
  Clock,
  PauseCircle,
  MessageSquare,
  Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockClients } from "@/lib/client-data"
import { useActiveTab } from "../active-tab-context"

interface Client {
  id: number
  firstName: string
  surname: string
  email: string
  phone: string
  city: string
  province: string
  status: string
  hasAlert?: boolean
  totalAssets?: number
  totalVolume?: number
  settledTrustCAD?: number
  settledTrustUSD?: number
  mailingAddress?: string
  residentialAddress?: string
  cellPhone?: string
  homePhone?: string
  [key: string]: any
}

export default function ClientsIntermediary() {
  const searchParams = useSearchParams()
  const { selectedStatuses, toggleStatus } = useActiveTab()
  const [clients] = useState<Client[]>(mockClients)
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const [filteredClients, setFilteredClients] = useState<Client[]>(mockClients)

  // Filter clients based on search params and status
  useEffect(() => {
    let filtered = clients

    const firstName = searchParams.get('firstName')
    const surname = searchParams.get('surname')
    const city = searchParams.get('city')
    const province = searchParams.get('province')
    const sin = searchParams.get('sin')
    const planId = searchParams.get('planId')
    const clientId = searchParams.get('clientId')

    if (firstName || surname || city || province || sin || planId || clientId) {
      filtered = clients.filter(client => {
        const matchesFirstName = !firstName || 
          client.firstName.toLowerCase().includes(firstName.toLowerCase())
        const matchesSurname = !surname || 
          client.surname.toLowerCase().includes(surname.toLowerCase())
        const matchesCity = !city || 
          client.city.toLowerCase().includes(city.toLowerCase())
        const matchesProvince = !province || 
          client.province.toLowerCase().includes(province.toLowerCase())
        const matchesSin = !sin || 
          client.sin?.includes(sin)
        const matchesPlanId = !planId || 
          client.planId?.toLowerCase().includes(planId.toLowerCase())
        const matchesClientId = !clientId || 
          client.clientId?.toLowerCase().includes(clientId.toLowerCase())
        
        return matchesFirstName && matchesSurname && matchesCity && 
               matchesProvince && matchesSin && matchesPlanId && matchesClientId
      })
    }

    // Filter by status
    if (selectedStatuses.length > 0) {
      const statusMap: Record<string, string> = {
        'active': 'active',
        'inactive': 'inactive', 
        'prospect': 'pending'
      }
      
      filtered = filtered.filter(client => {
        return selectedStatuses.some(status => client.status === statusMap[status])
      })
    }

    setFilteredClients(filtered)
  }, [searchParams, clients, selectedStatuses])

  // Sort clients alphabetically by surname
  const sortedClients = useMemo(() => {
    return [...filteredClients].sort((a, b) => {
      const surnameA = a.surname.toLowerCase()
      const surnameB = b.surname.toLowerCase()
      if (surnameA < surnameB) return -1
      if (surnameA > surnameB) return 1
      // If surnames are equal, sort by first name
      const firstNameA = a.firstName.toLowerCase()
      const firstNameB = b.firstName.toLowerCase()
      return firstNameA.localeCompare(firstNameB)
    })
  }, [filteredClients])

  // Set default selected client to first one
  useEffect(() => {
    if (sortedClients.length > 0 && selectedClientId === null) {
      setSelectedClientId(sortedClients[0].id)
    }
  }, [sortedClients, selectedClientId])

  const selectedClient = useMemo(() => {
    return sortedClients.find(client => client.id === selectedClientId) || null
  }, [sortedClients, selectedClientId])

  // Mock data for client features (these would come from the actual data model)
  const getClientFeatures = useCallback((client: Client) => {
    return {
      hasWarnings: client.hasAlert || false,
      hasMessages: Math.random() > 0.5, // Placeholder
      hasPlans: true, // Placeholder - would check if client has plans
      hasTrust: (client.settledTrustCAD || 0) > 0 || (client.settledTrustUSD || 0) > 0,
      aua: client.totalAssets || client.totalVolume || 0
    }
  }, [])

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "pending":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "inactive":
        return <PauseCircle className="h-3 w-3 text-gray-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }, [])

  // Mock warnings/exceptions data
  const getWarnings = useCallback((client: Client) => {
    if (!client.hasAlert) {
      return []
    }
    return [
      { id: 1, type: 'compliance', message: 'KYC update required', date: '2024-01-15' },
      { id: 2, type: 'exception', message: 'Account verification pending', date: '2024-01-10' }
    ]
  }, [])

  // Mock messages data
  const getMessages = useCallback((client: Client) => {
    return [
      { id: 1, type: 'note', message: 'Client requested portfolio review', date: '2024-01-20', author: 'Advisor' },
      { id: 2, type: 'message', message: 'Follow up on investment strategy discussion', date: '2024-01-18', author: 'Advisor' }
    ]
  }, [])

  // Mock recent trading activity
  const getRecentTrades = useCallback((client: Client) => {
    return [
      { id: 1, date: '2024-01-20', type: 'Purchase', product: 'AGF Global Strategic Income Fund', amount: 5000 },
      { id: 2, date: '2024-01-15', type: 'Redemption', product: 'GW CDN Fund', amount: 2500 },
      { id: 3, date: '2024-01-10', type: 'Purchase', product: 'CI Canadian Dividend Fund', amount: 10000 }
    ]
  }, [])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Search Bar and Filter Chips */}
      <div className="border-b border-border bg-background p-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-10"
            // This would be wired to actual search functionality
          />
        </div>
        
        {/* Filter Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={selectedStatuses.includes('active') ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleStatus('active')}
            className="h-8 text-xs"
          >
            Active
          </Button>
          <Button
            variant={selectedStatuses.includes('inactive') ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleStatus('inactive')}
            className="h-8 text-xs"
          >
            Inactive
          </Button>
          <Button
            variant={selectedStatuses.includes('prospect') ? 'default' : 'outline'}
            size="sm"
            onClick={() => toggleStatus('prospect')}
            className="h-8 text-xs"
          >
            Prospects
          </Button>
        </div>
      </div>

      {/* Two Panel Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Clients List */}
        <div className="w-full lg:w-80 border-r border-border bg-background flex flex-col overflow-hidden min-w-0">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-card-foreground mb-2">Clients</h2>
            <p className="text-xs text-muted-foreground">{sortedClients.length} clients</p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {sortedClients.length > 0 ? (
              <div className="divide-y divide-border">
                {sortedClients.map((client) => {
                  const features = getClientFeatures(client)
                  const isSelected = selectedClientId === client.id
                  
                  return (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      className={`
                        px-4 py-3 cursor-pointer transition-colors
                        ${isSelected 
                          ? 'bg-blue-50 border-l-4 border-l-blue-600' 
                          : 'hover:bg-muted/50'
                        }
                      `}
                      style={{ minHeight: '54px' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-card-foreground truncate">
                              {client.surname}, {client.firstName}
                            </span>
                            {getStatusIcon(client.status)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {features.hasWarnings && (
                              <AlertTriangle className="h-3.5 w-3.5 text-red-600 flex-shrink-0" title="Warnings/Exceptions" />
                            )}
                            {features.hasMessages && (
                              <MessageSquare className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" title="Messages" />
                            )}
                            {features.hasPlans && (
                              <FileText className="h-3.5 w-3.5 text-green-600 flex-shrink-0" title="Plans/Policies" />
                            )}
                            {features.hasTrust && (
                              <Shield className="h-3.5 w-3.5 text-purple-600 flex-shrink-0" title="Trust Account" />
                            )}
                            {features.aua > 0 && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">
                                  ${(features.aua / 1000).toFixed(0)}K
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">No clients found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Client Summary */}
        <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-6 min-w-0">
          {selectedClient ? (
            <div className="space-y-4">
              {/* Portfolio Tile - Full Width */}
              <Card className="border border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-card-foreground">Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Assets Under Administration</span>
                      <span className="text-2xl font-bold text-card-foreground">
                        ${((selectedClient.totalAssets || selectedClient.totalVolume || 0) / 1000).toFixed(0)}K
                      </span>
                    </div>
                    {(selectedClient.settledTrustCAD || 0) > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Trust Accounts (CAD)</span>
                        <span className="text-lg font-semibold text-card-foreground">
                          ${selectedClient.settledTrustCAD?.toLocaleString() || '0.00'}
                        </span>
                      </div>
                    )}
                    {(selectedClient.settledTrustUSD || 0) > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm text-muted-foreground">Trust Accounts (USD)</span>
                        <span className="text-lg font-semibold text-card-foreground">
                          ${selectedClient.settledTrustUSD?.toLocaleString() || '0.00'}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Row: Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Information */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-card-foreground">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-card-foreground truncate">{selectedClient.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-card-foreground">{selectedClient.phone}</p>
                        {selectedClient.cellPhone && selectedClient.cellPhone !== selectedClient.phone && (
                          <p className="text-xs text-muted-foreground mt-1">Cell: {selectedClient.cellPhone}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-card-foreground">
                          {selectedClient.city}, {selectedClient.province}
                        </p>
                        {selectedClient.mailingAddress && (
                          <p className="text-xs text-muted-foreground mt-1">{selectedClient.mailingAddress}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Warnings (Exceptions) */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      Warnings (Exceptions)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const warnings = getWarnings(selectedClient)
                      if (warnings.length === 0) {
                        return (
                          <div className="py-4 text-center">
                            <p className="text-sm text-muted-foreground">No current exceptions</p>
                          </div>
                        )
                      }
                      return (
                        <div className="space-y-2">
                          {warnings.map((warning) => (
                            <div key={warning.id} className="p-2 bg-red-50 rounded border border-red-200">
                              <p className="text-sm font-medium text-red-900">{warning.message}</p>
                              <p className="text-xs text-red-700 mt-1">{warning.date}</p>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>

                {/* Messages */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const messages = getMessages(selectedClient)
                      if (messages.length === 0) {
                        return (
                          <div className="py-4 text-center">
                            <p className="text-sm text-muted-foreground">No messages</p>
                          </div>
                        )
                      }
                      return (
                        <div className="space-y-3">
                          {messages.map((msg) => (
                            <div key={msg.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                              <p className="text-sm text-card-foreground">{msg.message}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">{msg.author}</span>
                                <span className="text-xs text-muted-foreground">{msg.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>

                {/* Recent Trading Activity */}
                <Card className="border border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Recent Trading Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const trades = getRecentTrades(selectedClient)
                      if (trades.length === 0) {
                        return (
                          <div className="py-4 text-center">
                            <p className="text-sm text-muted-foreground">No recent trades</p>
                          </div>
                        )
                      }
                      return (
                        <div className="space-y-3">
                          {trades.map((trade) => (
                            <div key={trade.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-card-foreground">{trade.type}</span>
                                <Badge variant={trade.type === 'Purchase' ? 'default' : 'secondary'} className="text-xs">
                                  {trade.type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{trade.product}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">{trade.date}</span>
                                <span className="text-xs font-medium text-card-foreground">
                                  ${trade.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground">Select a client to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

