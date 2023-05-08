export default Method.get(/branch/:${Method.uuid("id")}, null, async (req: Request, res: Response) => {
    const id: string = req.params.id;
  
    const branch = await Branch.findOne({
      where: {
        id,
        partnerId: req.user!.partnerId
      }
    });
    if (!branch) throw new NotfoundError(ERRORS.BRANCH_NOTFOUND, "Салбар олдсонгүй!");
  
    const profileBanners = await ProfileBanner.findAll({
      where: {
        branchId: branch.id,
        type    : PROFILE_BANNER_TYPES.BRANCH_BANNER
      }
    });
  
    const businesses = await BusinessBranch.findAll({
      where: {
        branchId: branch.id
      },
      include: [{
        model     : Business,
        as        : "business",
        attributes: ["id", "refCode", "type"]
      }]
    });
    console.log(" >>>\n  ========== Method.get ========== businesses", businesses);
  
    res.json({
      ...branch.toJSON(),
      profileBanners,
      buyers   : businesses.filter((item) => item.business.type === BUSINESS_TYPES.BUYER),
      suppliers: businesses.filter((item) => item.business.type === BUSINESS_TYPES.SUPPLIER)
    });
  });