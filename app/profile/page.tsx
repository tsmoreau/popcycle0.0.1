'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { User, Mail, Edit, Trophy, Users, Settings, Calendar, Package, ExternalLink } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AssembledItem {
  id: string;
  batchId: string;
  productId?: string;
  status: string;
  assemblyDate?: string;
  deliveryDate?: string;
  deliveredDate?: string;
  weight?: number;
  productName?: string;
  productDescription?: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [assembledItems, setAssembledItems] = useState<AssembledItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchAssembledItems();
    }
  }, [session]);

  const fetchAssembledItems = async () => {
    try {
      const response = await fetch('/api/profile/items');
      const data = await response.json();
      
      if (data.success) {
        setAssembledItems(data.items);
      } else {
        console.error('Failed to fetch assembled items:', data.error);
      }
    } catch (error) {
      console.error('Error fetching assembled items:', error);
    } finally {
      setLoadingItems(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="bg-white border-2 border-pop-black max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-xl helvetica-bold text-pop-black mb-4">Sign In Required</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your profile.</p>
            <Link href="/auth/signin">
              <Button className="systematic-caps bg-pop-green border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-pop-green">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasPortalAccess = session?.user?.userType === 'super_admin' || 
    (session?.user?.permissions && session.user.permissions.length > 0);

  const joinDate = 'Recently';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header - Keep the circular section you like */}
      <div className="bg-white border-b-4 border-pop-black">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-pop-green border-4 border-pop-black rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-12 h-12 text-pop-black" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl helvetica-bold text-pop-black">
                  {session.user?.name || 'User'}
                </h1>
                <div className="systematic-caps text-gray-600 mt-1 space-y-1">
                  <div>{session.user?.email}</div>
                  <div>Joined {joinDate}</div>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-3 mt-3">
                  <Badge className="bg-pop-green/10 text-pop-green border-pop-green">
                    <Trophy className="w-3 h-3 mr-1" />
                    {session.user?.userType === 'super_admin' ? 'Super Admin' : 'Maker'}
                  </Badge>
                  {hasPortalAccess && (
                    <Badge className="bg-pop-blue/10 text-pop-blue border-pop-blue">
                      <Users className="w-3 h-3 mr-1" />
                      Staff Access
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              {hasPortalAccess && (
                <Link href="/portal">
                  <Button className="systematic-caps bg-pop-blue border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-pop-blue w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Go to Portal
                  </Button>
                </Link>
              )}
              <Button variant="outline" className="systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl bg-gray-50 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Account Information */}
          <Card className="bg-white border-2 border-pop-black">
            <CardHeader>
              <CardTitle className="systematic-caps text-pop-black">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-pop-green flex-shrink-0" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <div className="pl-7">
                  <span className="text-sm text-gray-600">{session.user?.email}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-pop-blue flex-shrink-0" />
                  <span className="text-sm font-medium">Account Type</span>
                </div>
                <div className="pl-7">
                  <Badge className="bg-pop-green/10 text-pop-green border-pop-green">
                    {session.user?.userType === 'super_admin' ? 'Super Admin' : 'Maker Account'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-pop-red flex-shrink-0" />
                  <span className="text-sm font-medium">Member Since</span>
                </div>
                <div className="pl-7">
                  <span className="text-sm text-gray-600">{joinDate}</span>
                </div>
              </div>

              {hasPortalAccess && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-4 w-4 text-pop-blue flex-shrink-0" />
                      <span className="text-sm font-medium">Staff Permissions</span>
                    </div>
                    <div className="pl-7">
                      <div className="space-y-2">
                        <Badge className="bg-pop-blue/10 text-pop-blue border-pop-blue mr-2">
                          Portal Access
                        </Badge>
                        {session.user?.userType === 'super_admin' && (
                          <Badge className="bg-pop-red/10 text-pop-red border-pop-red">
                            Full Admin Rights
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border-2 border-pop-black">
            <CardHeader>
              <CardTitle className="systematic-caps text-pop-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Link href="/track">
                  <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-pop-green hover:text-white justify-start">
                    Track Plastic Items
                  </Button>
                </Link>
                
                <Link href="/shop">
                  <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-pop-red hover:text-white justify-start">
                    Browse Shop
                  </Button>
                </Link>

                <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-gray-100 justify-start" disabled>
                  Purchase History
                  <span className="ml-auto text-xs text-gray-400">Coming Soon</span>
                </Button>

                {hasPortalAccess && (
                  <Link href="/portal">
                    <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-pop-blue hover:text-white justify-start">
                      Access Portal Dashboard
                    </Button>
                  </Link>
                )}
                
                <Button variant="outline" className="w-full systematic-caps border-2 border-pop-black hover:bg-gray-100 justify-start" disabled>
                  Edit Profile Settings
                  <span className="ml-auto text-xs text-gray-400">Coming Soon</span>
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your PopCycle profile connects you to our circular economy platform. 
                  {hasPortalAccess ? ' As a staff member, you have access to operational tools and dashboards.' : ' Track your impact and discover recycled products made from transformed plastic waste.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assembled Items Section */}
        <Card className="bg-white border-2 border-pop-black mt-8">
          <CardHeader>
            <CardTitle className="systematic-caps text-pop-black flex items-center">
              <Package className="w-5 h-5 mr-2" />
              My Assembled Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingItems ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Loading your assembled items...</div>
              </div>
            ) : assembledItems.length > 0 ? (
              <div className="space-y-4">
                {assembledItems.map((item) => (
                  <div key={item.id} className="p-4 border-2 border-pop-black rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link 
                            href={`/track/${item.id}`}
                            className="helvetica-bold text-lg text-pop-black hover:text-pop-green transition-colors flex items-center"
                          >
                            {item.id}
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </Link>
                          <Badge 
                            className={`systematic-caps text-xs ${
                              item.status === 'delivered' 
                                ? 'bg-pop-green/10 text-pop-green border-pop-green'
                                : item.status === 'assembled'
                                ? 'bg-pop-blue/10 text-pop-blue border-pop-blue'
                                : 'bg-gray-100 text-gray-600 border-gray-300'
                            }`}
                          >
                            {item.status === 'delivered' ? 'Delivered' : 
                             item.status === 'assembled' ? 'Assembled' : 
                             item.status}
                          </Badge>
                        </div>

                        {item.productName && (
                          <div className="mb-2">
                            <span className="text-sm font-medium text-gray-700">Product: </span>
                            <span className="text-sm text-gray-600">{item.productName}</span>
                          </div>
                        )}

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Batch: </span>
                            <Link 
                              href={`/track/${item.batchId}`}
                              className="text-pop-blue hover:text-pop-green transition-colors"
                            >
                              {item.batchId}
                            </Link>
                          </div>
                          
                          {item.weight && (
                            <div>
                              <span className="font-medium">Weight: </span>
                              <span>{item.weight} kg</span>
                            </div>
                          )}
                          
                          {item.assemblyDate && (
                            <div>
                              <span className="font-medium">Assembled: </span>
                              <span>{formatDate(item.assemblyDate)}</span>
                            </div>
                          )}
                          
                          {(item.deliveredDate || item.deliveryDate) && (
                            <div>
                              <span className="font-medium">Delivered: </span>
                              <span>{formatDate(item.deliveredDate || item.deliveryDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {assembledItems.length >= 20 && (
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-500">Showing your 20 most recent items</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Assembled Items Yet</h3>
                <p className="text-gray-500 mb-4">You haven't assembled any items yet. Start by browsing available products!</p>
                <Link href="/shop">
                  <Button className="systematic-caps bg-pop-green border-2 border-pop-black text-pop-black hover:bg-pop-black hover:text-pop-green">
                    Browse Shop
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Coming Soon Section */}
        <Card className="bg-white border-2 border-pop-black mt-8">
          <CardHeader>
            <CardTitle className="systematic-caps text-pop-black">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-pop-green/5 border border-pop-green/20 rounded-lg">
                <Trophy className="w-8 h-8 text-pop-green mx-auto mb-2" />
                <h3 className="systematic-caps font-medium text-pop-black mb-1">Maker Achievements</h3>
                <p className="text-sm text-gray-600">Track your progress and unlock new skill badges</p>
              </div>
              
              <div className="p-4 bg-pop-blue/5 border border-pop-blue/20 rounded-lg">
                <Users className="w-8 h-8 text-pop-blue mx-auto mb-2" />
                <h3 className="systematic-caps font-medium text-pop-black mb-1">Community Features</h3>
                <p className="text-sm text-gray-600">Connect with other makers and share projects</p>
              </div>
              
              <div className="p-4 bg-pop-red/5 border border-pop-red/20 rounded-lg">
                <Settings className="w-8 h-8 text-pop-red mx-auto mb-2" />
                <h3 className="systematic-caps font-medium text-pop-black mb-1">Profile Customization</h3>
                <p className="text-sm text-gray-600">Personalize your profile and privacy settings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}